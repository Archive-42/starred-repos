#' do Unsupervised Clustering using kNN-graph
#' @param vat vat entity
#' @param analysis.key analysis.key for clustering
#' @param pc.num PC components for clustering
#' @param cluster.name cell.props's column name saving cluster results
#' @param k k-nearest graph's value, default 100, if 0, then set k = floor(sqrt(nrow(cells))/2)
#' @param dist.type default "euclidean"
#' @param save.KNN whether or not saving kN, default TRUE (no implemented)
#' @param verbose whether or not printing verbose, default TRUE
#'
#' @export
#' @examples
#' vat <- doCluster(vat)
#'
doCluster <- function(vat, analysis.key = "PCA", pc.num = 50, cluster.name = "cluster", k = 100, dist.type="euclidean", save.KNN = TRUE,verbose = TRUE, ...){
  data <- getAnalysisData(vat,key = analysis.key, cols =c(1:pc.num))
  #get cell-cell euclidean distance matrix
  cell.dist <- as.matrix(dist(data))
  knn <- buildKNNGraph(cell.dist, k = k, dist.type, verbose)
  clust.result <- clusterGraph(knn)
  vat <- addCellProp(vat, clust.result$cluster, cluster.name, meta.key="Group",meta.value = cluster.name)
  return(vat)
}

#' Building kNN Graph for clustering
#' @param cell.dist cell distant matrix
#' @param k kNN's k value
#' @param dist.type distanct type
#' @param verbose whether or not printing verbose, default
#' @importFrom cccd nng
#' @export

buildKNNGraph <- function(cell.dist, k, dist.type, verbose=TRUE){
  if (k == 0){
    k <- floor(sqrt(nrow(cell.dist))/2)
  }
  if (verbose){
    logging(sprintf("Building %d-nearest [%s] neighbor graph..", k, dist.type))
  }
  graph <- nng(cell.dist, k = k)
  V(graph)$name <- rownames(cell.dist)
  if(verbose){
    logging(sprintf("%s %d-NN computed. Average degree: %f", dist.type, k, mean(degree(graph))))
  }
  return(graph)
}

#' Clustering Graph
#'
#' @param graph kNN graph
#' @param graph.type can be jaccard, invlogweighted or dice. Default knn
#' @param community.detect can be louvain, infomap or markov. Default infomap
#' @param k k-value
#' @import igraph
#'
clusterGraph <- function(	graph,  graph.type="knn", # can be threshold (binarise the distance matrix), jaccard or knn
                           community.detect="infomap",
                           k = 0)
{
  if(identical(toupper(community.detect), toupper("markov")))
  {
    r = igraph::cluster.markov(graph)
    clusters = r$Cluster
  }else{
    if(identical(toupper(community.detect), toupper("louvain")))
    {
      r = igraph::multilevel.community(as.undirected(graph))
      clusters = r$membership
    }else{
      if(identical(toupper(community.detect), toupper("infomap")))
      {
        r = igraph::infomap.community(graph, modularity=TRUE)
        clusters = r$membership
      }else{
        stop(sprintf("Unknown community detection method: %s", community.detect))
      }
    }
  }
  n.clusters =length(unique(clusters))
  f = function(i){as.vector(clusters==i)}
  clist= lapply(1:n.clusters, f)
  m = igraph::modularity(graph, clusters)
  return (list("result"=r,
               "method"=paste(graph.type, "-graph clustering [", community.detect,"]", sep=""),
               "clust.num"=n.clusters,
               "modularity"=m,
               "clust.list"=clist,
               "cluster"=clusters))
}
