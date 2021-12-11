#' do PCA using irlba library
#'
#' @param vat vat entity
#' @param pc.num default 50
#' @param use.genes run PCA using the genes. if NULL, using vat@use.genes. default NULL
#' @param key set PCA result's key, default "PCA"
#' @importFrom irlba prcomp_irlba
#' @export
#' @examples
#' vat <- doPCA(vat, pc.num = 50)
doPCA <- function(vat, pc.num = 50, use.genes = NULL, key="PCA", ...){
  data <- getUseData(vat, use.genes=use.genes)
  pc.num <- min(pc.num, nrow(data) - 1)
  pca <- irlba::prcomp_irlba(t(data), n = pc.num, retx=TRUE, ...)
  rownames(pca$rotation) <- use.genes
  pca$gene.loadings <- pca$rotation
  pca$cell.values <- pca$x
  pca$rotation <- NULL
  pca$x <- NULL
  eval(parse(text=paste0("vat@analysis$",key,"<-pca")))
  return(vat)
}

#' do tSNE using Rtsne library
#'
#' @param vat vat entity
#' @param dims tSNE dimension
#' @param analysis.key tSNE input data key, default "PCA", if NULL, use vat@data
#' @param use.col columns number for tSNE
#' @param key set tSNE result's key, default "tSNE"
#' @param seed random seed for tSNE, default NULL
#' @param ... see also Rtsne::Rtsne parameters, For example, set check_duplicates = FALSE for Error "Remove duplicates before running TSNE."
#' @importFrom Rtsne Rtsne
#' @export
#' @examples
#' vat <- doTSNE(vat, dims = 2, use.col = 50, seed = 100)
#'
doTSNE <- function(vat, dims = 2, analysis.key = "PCA", use.col = 50, key="tSNE", seed = NULL,...){
  if(!is.null(seed)) set.seed(seed)
  data <- getAnalysisData(vat,key = analysis.key, cols =c(1:use.col))
  tsne <- Rtsne::Rtsne(as.matrix(data), dims = dims, ...)
  tsne <- tsne$Y
  colnames(tsne) <- getAnalysisColName(key, c(1:dims))
  vat@analysis$tSNE$cell.values <- tsne
  return(vat)
}

