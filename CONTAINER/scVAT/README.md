---
output:
  html_document: default
  pdf_document: default
---
# scVAT (single-cell RNA Visual Analysis Toolkit)
scVAT is a Visual Analysis Toolkit for single-cell RNA sequence data. scVAT implements a base pipeline for scRNA, including loading, preprocessing, filtering, PCA and tSNE etc. Besides, it provides:
- A Web GUI (Graphical User Interface) for visualizing all kinds of analysis results
- Graphical clustering manually based on analysis data
- Differentiating cells

## Install
You can install scVAT from GitHub with:
```{r}
#install.package("devtools")
devtools::install_github("HuobinTan/scVAT")
```

## Loading gene-cell expression matrix
There are three different functions for loading gene-cell expression matrix:
- Loading .csv file
- Loading 10X H5 file
- Loading 10X data path

### loading csv file
```{r}
library(scVAT)

#Example1: load expression matrix from CSV (using your file name)
#the firsh column is gene name, the first row is cell id
csv.data <- loadCSVData("./expression.csv")

#Example2: loading matrix using different parameters
# gene.index: gene name's index, default 1
# cell.index: cell name's index, default 1
# gene.in.row: genes store in rows, default TRUE
csv.data <- loadCSVData (filename = "./expression.csv", gene.index = 1, cell.index = 1, gene.in.row=TRUE)

#Example3:  loading matrix and specifying gene.names and cell ids, and genes store in columns
csv.data <- loadCSVData (filename = "./expression.csv", gene.names = genes, cell.names = cells, gene.in.row=FALSE)
```
### loading 10x result (H5file or path)
```{r}
# loading matrix from 10x H5 file
# genome: genome in the H5, such as "mm10"", "GRch38", default NULL, the first genome 
h5.data <-load10XH5(filename = "./filtered_gene_bc_matrices_h5.h5", genome = NULL)

#loading matrix from 10x outs path, including barcodes.tsv, genes.tsv and matrix.mtx
path10x.data <- load10XPath(path = "./filtered_gene_bc_matrices/mm10")
```

## Initialize VAT Entity
Building VAT object based on the last expression matrix, Besides:
- Seting paremeters to filter genes and cells (min.genes, min.cells)
- Scaling the data using library size: if cell.scale is  TRUE, p <- (p / nUMI \* scale.factor) for each cell;  if scale.factor is 0,  scale.factor =  median(nUMI)
- Log-Transform: if log.trans, then p <- log(p + pseudocount)
```{r}
#Example1: initializing VAT entity (using default parameters)
vat <- initVATEntity(csv.data, title="VAT")

#Example2: initializing VAT entity using different parameters
vat <- initVATEntity(data.raw = csv.data, title = "VAT", min.genes = 0, min.cells = 0,
                          cell.scale = TRUE, scale.factor = 0,
                          log.trans = TRUE, pseudocount = 1,
                          verbose = TRUE)
```

## Do analysis
### Do base pipeline (PCA, tSNE and Clustering)
```{r}
#running PCA
#PCA will be saved in the vat@analysis$PCA
vat <- doPCA(vat, pc.num = 50, use.genes = NULL)
#plotting PC's standard deviation, and selecting PC components for downstream
plotPCASDev(vat, key="PCA", ndims = 50)
#runing tSNE based on analysis data
vat <- doTSNE(vat, dims = 2, analysis.key = "PCA", use.col = 50)
#clustering based on PCA. cluster.name is the name saved cluster result. k-value for kNN
vat <- doCluster(vat,analysis.key="PCA", pc.num = 50, cluster.name="cluster", k = 100)
```
### Load external analysis results
```{r}
#combining other analysis data
#analysis.data: the variable storing analysis result
#dims: the dimensions 
#key: accession key
vat <- loadAnalysis(vat, analysis.data = tsne$Y, dims = c(1:2), key = "tSNE")

#loading another analysis data from csv file (filename)
#ndims: the dimension (2 or 3 more) 
#key: analysis data key
vat <- loadAnalysisFromCSV(vat, filename = "youranalysisfile", ndims = 3, key="YourKey")
```


## Visualize analysis data
### Visualize PCA and tSNE result
```{r}
#plotting PCA result, set x.pc, y.pc. if 3D, set z.pc
plotPC(vat, x.pc = 1, y.pc = 2, z.pc = 3)
#plotting tSNE, and group.id for grouping
plotTSNE(vat, group.id = "manual.cluster")
```
### Visualize gene expressions based on analysis results 
Plot one gene expression (2D) 
```{r}
#genes: gene name
#dims: dimensions, for 2D: c(1,2) or c(1,3)...
#key: using visualization analysis data, using getAnalysisKey(vat) to get avaliable keys
#gradient: whether or not gradient, default TRUE
#colors: color palette
plotGene(vat, genes="Cdc20", dims=c(1,2), key="tSNE", gradient=TRUE, colors=c("lightgrey","blue"))
```
Plot one gene expression (3D) 
```{r}
#genes: gene name
#dims: dimensions, for 3D: c(1,2,3)
#key: using visualization analysis data, using getAnalysisKey(vat) to get avaliable keys
#gradient: whether or not gradient, default TRUE
#colors: color palette
#size,size: adjust point size
plotGene(vat, genes="Cdc20", dims=c(1,2,3), key="PHATE", gradient=TRUE, colors=c("lightgrey","blue"), size=1, sizes=c(1,5))
```
Plot two or three genes (no gradient, other parameters are similar to plot one gene)
```{r}
plotTwoGenes(vat, gene1="Cdc20", gene2 = "Ube2c", dims = c(1,2), key="tSNE")
plotThreeGenes(vat, gene1 = "Cdc20", gene2 = "Ube2c", gene3="Gata1", dim=c(1,2), key="tSNE")
```
Plot a few genes at the sometime (just 2D maps)
```{r}
#nrows: set rows number
plotGenes(vat, genes=c("Cdc20","Ube2c","Gata1","Gata2"),nrows=2, dims=c(1,2), key="tSNE")
```
Start Web GUI, and explore the dataset
```{r}
#starting Web GUI for visualizing, manually clustering, and differintialing
#be cautious, the parameter is a character string of variable name, not variable
startVATGUI("vat")
```
## Differential Analysis
If you have got cell's clusters (including: `doCluster()` result and  'Manual Clustering' result in Web GUI), you'll do differential analysis to find each cluster's marker genes.

### Get marker genes for each cluster
```{r}
#group.key: group data key value, using `getPropMeta(vat,"Group")` to get available group.keys
#         doCluster() function: group.key = cluster.name, default 'cluster', 
#         'Manual Clustering' in Web GUI: group.key='manual.cluster'
#method: differential analysis method, 't' - t-test, 'wilcox' - Wilcoxon rank sum test, 'DESeq2' - use DESeq2 library
#min.logfc: only return genes at least X-fold difference (log-scale) between the two groups of cells. Default is 0.25
#min.avg: only return genes that are average expression at least min.avg in either of the two populations. 
markers <- doAllDiffAnalysis(vat, group.key="cluster", method="t",min.logfc=0.25, min.avg = 0.1)
```
### Get marker genes for specific two groups
```{r}
#Compare group1 and group2 cells from 'Manual Clustering', and get group1's significant genes. 
#if group2=NULL, compare group1 and all other cells
#other parameters are same as doAllDiffAnalysis
group.markers <- doDiffAnalysis(vat, group1="1", group2="2",group.key="manual.cluster")
```
In addition, you can do differential analysis in Web GUI
