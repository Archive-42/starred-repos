#' load data from csv file
#' @param filename csv file names
#' @param gene.index gene name's subscript
#' @param cell.index cell name's subscript
#' @param gene.names set rownames=gene.names, default NULL, using the gene.index
#' @param cell.names set colnames=cell.names, default NULL, using the cell.index
#' @param gene.in.row gene store in row, default TRUE
#' @param ... see also read.csv
#'
#' @return data sparseMatrix data
#' @import Matrix
#' @export
#'
#' @examples
#' data <- loadCSVData("./filename.csv")
#'
#' data <- loadCSVData("./filename.csv", gene.in.row = FALSE)
loadCSVData <- function(filename, gene.index = 1, cell.index = 1,
                        gene.names=NULL, cell.names=NULL, gene.in.row=TRUE,...){
  if( (gene.index <= 0)&&(is.null(gene.names)) ){
    stop("Must set gene.index or gene.names")
  }
  if( (cell.index <= 0)&&(is.null(cell.names)) ){
    stop("Must set cell.index or cell.names")
  }
  data <- read.csv(filename, header=FALSE, stringsAsFactors = FALSE, ...)
  if(gene.in.row){
    if(gene.index >= 0 ){
      if(is.null(gene.names)){
        gene.names <- data[, gene.index]
        if(cell.index>=0){
          gene.names <- gene.names[-cell.index]
        }
      }
      data <- data[, -gene.index]
    }
    if(cell.index >= 0){
      if(is.null(cell.names)){
        cell.names <- data[cell.index, ]
      }
      data <- data[-cell.index, ]
    }
  }else{
    if(gene.index >= 0 ){
      if(is.null(gene.names)){
        gene.names <- data[gene.index,]
      }
      if(cell.index>=0){
        gene.names <- gene.names[-cell.index]
      }
      data <- data[-gene.index, ]
    }
    if(cell.index >= 0){
      if(is.null(cell.names)){
        cell.names <- data[, cell.index]
      }
      data <- data[, -cell.index]
    }
    data <- t(data)
  }
  data <- as.matrix(data)
  if(is.character(data[1,1])){
    data <- matrix(as.numeric(data),nrow=nrow(data))
  }
  data <- Matrix::Matrix(data, sparse=TRUE)
  #data <- as(data, "sparseMatrix")

  rownames(data) <- gene.names
  colnames(data) <- cell.names
  return(data)
}

#' load data from H5 file
#' @param filename h5 file name for 10X
#' @param genome h5group genome name, default NULL, returns first group
#' @import Matrix
#' @importFrom rhdf5 h5read
#' @export
#'
#' @examples
#' data <- loadH5Data("./filtered_gene_bc_matrices_h5.h5",genome="mm10")
load10XH5 <- function(filename, genome=NULL)
{
  if(is.null(genome)){
    dset <- h5read(filename,"/")[[1]]
  }else{
    dset <- h5read(filename, genome)
  }

  data <- Matrix::sparseMatrix(i=dset$indices + 1,p=dset$indptr,
                       x=dset$data, dims=dset$shape,
                       dimnames = list(dset$gene_names,dset$barcodes))
  return(data)
}

#' load data from 10x path (including barcodes.tsv, genes.tsv and matrix.mtx)
#' @param path directory stroed in 10x data
#' @import Matrix
#' @export
#'
#' @examples
#' data <- loadH5Data("./filtered_gene_bc_matrices/mm10")
load10XPath <- function(path)
{
  if(!dir.exists(path)){
    stop("File path doesn't exist")
  }
  if(!grepl("\\/$", path)){
    path <- paste(path, "/", sep = "")
  }
  barcodes.file <- paste0(path, "barcodes.tsv")
  genes.file <- paste0(path, "genes.tsv")
  data.file <- paste0(path, "matrix.mtx")
  if(!file.exists(barcodes.file)){
    stop("Barcodes file is lost")
  }
  if(!file.exists(genes.file)){
    stop("Genes file is lost")
  }
  if(!file.exists(data.file)){
    stop("Expression file is lost")
  }
  cells <- readLines(barcodes.file)
  genes <- readLines(genes.file)
  genes <- strsplit(genes,"\t")
  genes <- do.call(rbind, genes)[, 2]#1-gene id, 2-gene names
  data <- Matrix::readMM(data.file)
  rownames(data) <- genes
  colnames(data) <- cells
  return(data)
}

#' initialize VAT Entity
#' @param data.raw data matrix
#' @param title dataset name
#' @param min.genes Include cells where more than this many genes are detected, default 0
#' @param min.cells Include genes where more than this many cells are detected, default 0
#' @param cell.scale whether or not normalizing by library size, default FALSE
#' @param scale.factor multiple factor for cell.scale, default 0, using the mean for library size
#' @param log.trans whether or not log-transform (log(p+pseudocount)), default TRUE
#' @param pseducount pseducount for log-transform, default 1
#' @param verbose whether or not printing verbose, default TRUE
#' @export
#'
#' @import Matrix
#' @examples
#' vat <- initVATEntity(data.raw = data, title="VAT")
#'
#' vat <- initVATEntity(data, title="VAT", min.genes = 0, min.cells = 3, cell.scale = TRUE)
initVATEntity <- function(data.raw, title = "VAT", min.genes = 0, min.cells = 0,
                          cell.scale = FALSE, scale.factor = 0,
                          log.trans = TRUE, pseudocount = 1,
                          verbose = TRUE){
  if(verbose) logging("create VAT Entity...")
  entity <- new(Class="VATEntity", data.raw=as(data.raw,"sparseMatrix"), title=title)
  use.genes <- as.vector(rownames(entity@data.raw))
  use.cells <- as.vector(colnames(entity@data.raw))
  #Filter duplicated genes and cells
  dup.genes <- which(duplicated(use.genes))
  dup.cells <- which(duplicated(use.cells))
  if(length(dup.genes) > 0)  use.genes <- use.genes[-dup.genes]
  if(length(dup.cells) > 0)use.cells <- use.cells[-dup.cells]
  entity@data.raw <- entity@data.raw[use.genes, use.cells]
  #Calculating gene number, UMI and cell number
  gene.nums <- apply(entity@data.raw, 2, function(x){return (sum(x>0))})  # expressed gene's number for eache cell
  umi.nums <- Matrix::colSums(entity@data.raw) #apply(entity@data.raw, 2, function(x){return (sum(x))}) # expressed gene's UMI for each cell
  cell.nums <- apply(entity@data.raw, 1, function(x){return (sum(x>0))}) # cell's number for each gene

  #filtering cells and genes
  if(verbose) logging("Filtering cells and genes...")
  if(min.genes >= 0){
    use.cells <- use.cells[which(gene.nums > min.genes)]
  }
  if(min.cells >= 0){
    use.genes <- use.genes[which(cell.nums > min.cells)]
  }
  entity@data.raw <- entity@data.raw[use.genes, use.cells]

  #set gene and cell properties
  entity@use.genes <- use.genes
  entity@gene.props <- data.frame(name=use.genes, cell.nums=cell.nums[use.genes], row.names = use.genes)
  entity@cell.props <- data.frame(name=use.cells, gene.nums=gene.nums[use.cells],umi=umi.nums[use.cells],row.names = use.cells)
  entity@cell.props$manual.cluster <- 0
  entity@prop.meta[["Group"]] <- c("manual.cluster")

  #Normalize the data using log and scale UMI
  if(verbose) logging("Scaling and Normalizing data...")
  entity@data <- entity@data.raw
  if(cell.scale){
    index <- c(1:nrow(entity@cell.props))
    if(scale.factor==0){
      scale.factor <- median(entity@cell.props$umi)
    }

    #if(verbose) ulapply <- pbapply::pblapply
    #else ulapply <- lapply
    #entity@data <- ulapply(index, function(x){return(entity@data[,x] * scale.factor /entity@cell.props$umi[x])})
    entity@data <- entity@data * scale.factor / entity@cell.props$umi
    #entity@data <- do.call("cbind", entity@data)
    entity@data <- as(entity@data,"sparseMatrix")
  }
  if(log.trans){
    entity@data <- log(entity@data + pseudocount)
    entity@data <- as(entity@data,"sparseMatrix")
  }
  if(verbose) logging("It's done!")
  return(entity)
}

#' load analysis result manually from csv
#' @param vat VATEntity object
#' @param filename csv filename
#' @param ndims the dim of analysis result
#' @param key key value in the anlaysis list
#' @export
#'
#' @return new vat entity including new analysis result
#' @examples
#' #loading external tSNE result
#'  vat <- loadAnalysisFromCSV(vat, filename="tsne$Y.csv", ndims=2, key = "tSNE")
loadAnalysisFromCSV <- function(vat, filename, ndims = 2, key = "tSNE", ...){
  data <- read.csv(filename,...)
  if((ndims + 1) == ncol(data)){
    rownames <- data[,1]
    data <- data[,-1]
    data <- as.matrix(data)
    rownames(data) <- rownames
  }
  vat <- loadAnalysis(vat,analysis.data = data, dims=c(1:ndims),key=key)
  return(vat)
}

#' load analysis result manually
#' @param vat VATEntity object
#' @param analysis.data analysis data for cells
#' @param dims the dim values of analysis result
#' @param key key value in the anlaysis list
#' @export
#'
#' @return new vat entity including new analysis result
loadAnalysis <- function(vat, analysis.data, dims = c(1:2), key = "tSNE"){
  if(nrow(analysis.data)!=nrow(vat@cell.props)){
    stop("The nrow of analsis data must equal with the nrow of vat@cell.props")
  }
  analysis.data <- analysis.data[,dims]
  colnames(analysis.data) <- getAnalysisColName(key,dims)
  analysis.data <- list(cell.values=analysis.data)
  eval(parse(text=paste0("vat@analysis$",key," <- analysis.data")))
  return(vat)
}
