
#' Differential Analysis for group1 and group2 (according to group.key)
#'
#' @param vat VAT entity
#' @param group1 Group ID for the first group from vat@cell.props[group.key]
#' @param group2 Group ID for the second group from vat@cell.props[group.key]
#'  If NULL (default), use all other cells for comparison.
#' @param group.key Key value storing Group from colnames(vat@cell.props) for Differential Analysis
#' @param use.genes Genes ,Default is to use all genes
#' @param method Method which does differential analysise. Available options are:
##' \itemize{
##'  \item{"t"} :  t-test (default)
##'  \item{"wilcox"} : Wilcoxon rank sum test
##'  \item{"DESeq2} : DE based on a model using the negative binomial distribution (Love et al, Genome Biology, 2014), required DESeq2 library.
##' }
#' @param min.logfc At least X-fold difference (log-scale) between the two groups of cells. Default is 0.25
#' @param only.pos Only return positive markers (FALSE by default)
#' @param min.avg  only compare genes which average min.avg cells in either of  two groups, Default is 0.1
#' @param min.diff.avg  only  compare genes which minimum difference between  two groups. Default is -Inf
#' @param top.num only return top.num results. Default is Inf, and return all results
#' @param min.cells Minimum number of cells expressing the gene in at least min.cells. Default is 1
#' @param verbose Show the progress bar
#' @import Matrix
#' @export
#'
#' @return
#' p-value adjustment is performed using bonferroni correction based on the total number of genes in the dataset.
doDiffAnalysis <- function(vat, group1, group2 = NULL, group.key = "cluster", use.genes = NULL,  method = "t",
  min.logfc = 0.25, only.pos = FALSE, min.avg = 0.1,  min.diff.avg = -Inf, top.num = Inf, min.cells = 1, verbose = TRUE)
{
  data <- getUseData(vat, use.genes=use.genes)
  if(is.null(use.genes)) use.genes <- rownames(data)
  if(method %in% c("DESeq2")){# no filter
    genes.use <- rownames(data)
    min.diff.avg <- -Inf
    min.logfc <- 0
  }

  if(!(group.key %in% colnames(vat@cell.props))){
    stop(sprintf("No '%s' group data, Please doCluster() or use another key!", group.key))
  }
  all.groups <- unique(vat@cell.props[,group.key])
  if(sum(group1 %in% all.groups)==0){
    stop("No Group1!, Please use the correct group id")
  }
  if(is.null(group2)){
    group2 <- setdiff(all.groups, group1)
  }
  if(sum(group1 %in% group2) > 0){
    stop("Group1 and Group2 are duplicated!")
  }

  cells1 <- which(vat@cell.props[, group.key] %in% group1)
  cells2 <- which(vat@cell.props[, group.key] %in% group2)
  if(length(cells1) < min.cells || length(cells2) < min.cells){
    stop("Too few cells in either group!")
  }

  data1 <- data[use.genes, cells1, drop = F]
  data2 <- data[use.genes, cells2, drop = F]

  avg1 <- Matrix::rowMeans(data1)
  avg2 <- Matrix::rowMeans(data2)
  diff.avg <- abs(avg1 - avg2)
  use.genes <- use.genes[intersect( union(which(avg1 > min.avg),which(avg2 > min.avg)), which(diff.avg > min.diff.avg) )]
  if (length(use.genes) == 0) {
    stop("No genes satisfy threshold, maybe adjust threshold: min.avg, min.dff.avg")
  }

  data1 <- data[use.genes, cells1, drop = F]
  data2 <- data[use.genes, cells2, drop = F]
  log.avg1 <- log(Matrix::rowMeans(exp(data1)-1) + 1)
  log.avg2 <- log(Matrix::rowMeans(exp(data2)-1) + 1)
  log.fc <- log.avg1 - log.avg2

  if (!only.pos){
    logfc.genes <- use.genes[which(abs(log.fc) > min.logfc)]
  }else{
    logfc.genes <- use.genes[which(log.fc > min.logfc)]
  }
  use.genes <- intersect(use.genes, logfc.genes)

  if (method == "t") {
    result <- doTTest(vat, cells1, cells2, use.genes, verbose)
  } else if (method == "wilcox"){
    result <- doWilcoxTest(vat, cells1, cells2, use.genes, verbose)
  }else if (method == "DESeq2"){
    result <- doDESeq2Test(vat, cells1, cells2, use.genes, verbose)
  }else{
    stop(sprintf("%s is not implemented!",method))
  }
  result$logFC <- round(log.fc[use.genes],4)
  result$avg1 <- round(avg1[use.genes],4)
  result$avg2 <- round(avg2[use.genes],4)

  #?? about the parameter "n" for p.adjust, whether or not number of use.genes or  all genes? (as Aaron Lun)
  result$pvalue.adj <- p.adjust(result$pvalue, method = "bonferroni", n = nrow(vat@gene.props))

  result <- result[order(result$pvalue, -result$logFC),]
  if(top.num < nrow(result) ){
    result <- result[c(1:top.num),]
  }
  return(result)
}

#' Differential Analysis for specific clusters (according to group.key)
#'
#' @param vat VAT entity
#' @param group.key Key value storing Group from colnames(vat@cell.props) for Differential Analysis
#' @param use.genes Genes ,Default is to use all genes
#' @param method Method which does differential analysise. Available options are:
##' \itemize{
##'  \item{"t"} :  t-test (default)
##'  \item{"wilcox"} : Wilcoxon rank sum test
##'  \item{"DESeq2} : DE based on a model using the negative binomial distribution (Love et al, Genome Biology, 2014), required DESeq2 library.
##' }
#' @param min.logfc At least X-fold difference (log-scale) between the two groups of cells. Default is 0.25
#' @param only.pos Only return positive markers (FALSE by default)
#' @param min.avg  only compare genes which average min.avg cells in either of  two groups, Default is 0.1
#' @param min.diff.avg  only  compare genes which minimum difference between  two groups. Default is -Inf
#' @param top.num only return top.num results. Default is Inf, and return all results
#' @param min.cells Minimum number of cells expressing the gene in at least min.cells. Default is 1
#' @param verbose Show the progress bar
#' @export
#' @return
#' p-value adjustment is performed using bonferroni correction based on the total number of genes in the dataset.
doAllDiffAnalysis <- function(vat, group.key = "cluster", use.genes = NULL,  method = "t",
                           min.logfc = 0.25, only.pos = FALSE, min.avg = 0.1,  min.diff.avg = -Inf, top.num = Inf, min.cells = 1, verbose = TRUE)
{
  data <- getUseData(vat, use.genes=use.genes)
  if(is.null(use.genes)) use.genes <- rownames(data)

  if(!(group.key %in% colnames(vat@cell.props))){
    stop(sprintf("No '%s' group data, Please doCluster() or use another key!", group.key))
  }
  all.groups <- sort(unique(vat@cell.props[,group.key]))
  group.diff <- list()
  for(i in seq_len(length(all.groups))){
    group.id <- all.groups[i]
    if(verbose){
      logging(sprintf("Calculating Cluster: %s", group.id))
    }
    group.diff[[i]] <- tryCatch({
      doDiffAnalysis(
        vat, group1 = group.id, group2 = NULL,
        group.key = group.key,use.genes = use.genes, method = method,
        min.logfc = min.logfc, only.pos = only.pos,
        min.avg = min.avg, min.diff.avg = min.diff.avg,
        top.num = top.num, min.cells = min.cells, verbose = verbose
        )
    }, error = function(cond){return(NULL)})
    if(!is.null(group.diff[[i]])){
      group.diff[[i]] <- data.frame(cluster = group.id, group.diff[[i]])
    }
  }
  result <- do.call(rbind, group.diff)
  rownames(result) <- make.unique(as.character(result$gene),sep = "_")
  #rownames(result) <- paste0(result$gene, result$cluster)
  return(result)
}

#'do t-test for differential analysis
#'
#'@param vat vat entity
#'@param cells1  the first group index
#'@param cells2 the second group index
#'@param use.genes the genes for  differential analysis
#'@param verbose whether or not showing verbose, default TRUE
#'@importFrom pbapply pbsapply
#'
#'@return p.value for test, rownames are use.genes
#'
doTTest <- function(vat, cells1, cells2, use.genes, verbose=TRUE){
  data <- getUseData(vat,use.genes=use.genes,use.raw = FALSE)
  if(is.null(use.genes)) use.genes <- rownames(data)
  if(verbose) use.sapply <- pbsapply
  else use.sapply <- sapply
  pvalue <- use.sapply(
    use.genes,
    FUN = function(gene){
      t.test(x = data[gene, cells1], y = data[gene, cells2])$p.value
    }
  )
  return(data.frame(gene = use.genes, pvalue,row.names = use.genes))
}

#'do Wilcox Rank Sum test for differential analysis
#'
#'@param vat vat entity
#'@param cells1  the first group index
#'@param cells2 the second group index
#'@param use.genes the genes for  differential analysis
#'@param verbose whether or not showing verbose, default TRUE
#'@importFrom pbapply pbsapply
#'
#'@return use.genes, p.value for test, rownames are use.genes
#'
doWilcoxTest <- function(vat, cells1, cells2, use.genes, verbose=TRUE){
  data <- getUseData(vat,use.genes=use.genes,use.raw = FALSE)
  if(is.null(use.genes)) use.genes <- rownames(data)
  if(verbose) use.sapply <- pbsapply
  else use.sapply <- sapply
  pvalue <- use.sapply(
    use.genes,
    FUN = function(gene){
      wilcox.test(x = data[gene, cells1], y = data[gene, cells2])$p.value
    }
  )
  return(data.frame(gene = use.genes, pvalue,row.names = use.genes))
}

#'call DESeq2 test for differential analysis
#'
#'@param vat entity
#'@param cells1  the first group index
#'@param cells2 the second group index
#'@param use.genes the genes for  differential analysis
#'@param verbose whether or not showing verbose, default TRUE
#'@importFrom pbapply pbsapply
#'@importFrom DESeq2 DESeqDataSetFromMatrix estimateSizeFactors estimateDispersions nbinomWaldTest results
#'
#'@return use.genes, p.value for test, rownames are use.genes
#'
doDESeq2Test <- function(vat, cells1, cells2, use.genes, verbose=TRUE){
  if (!'DESeq2' %in% rownames(x = installed.packages())) {
    source("https://bioconductor.org/biocLite.R")
    biocLite("DESeq2")
  }

  data <- getUseData(vat,use.genes=use.genes,use.raw = TRUE)
  data <- data[,c(cells1,cells2)]
  if(is.null(use.genes)) use.genes <- rownames(data)

  cell.props <- vat@cell.props[c(cells1,cells2),"name",drop=F]
  cell.props$group <- "Group1"
  cell.props$group[cells2] <- "Group2"

  dds <- DESeq2::DESeqDataSetFromMatrix(countData = data, colData = cell.props, design= ~ group)
  dds <- DESeq2::estimateSizeFactors(dds)
  dds <- DESeq2::estimateDispersions(dds, fitType = "local")
  dds <- DESeq2::nbinomWaldTest(object = dds)
  result <- DESeq2::results(dds,contrast = c("group", "Group1", "Group2"),alpha = 0.05, ...)
  pvalue <- result$pvalue
  return(data.frame(gene = use.genes, pvalue,row.names = use.genes))
}
