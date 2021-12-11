#' plot tsne maps
#'
#' @param vat VAT Entity
#' @param title plot's title
#' @param group.id cell property for group
#' @param gradient whether or not with gradient
#' @param colors color palette
#' @param source plot's data source for shinyui
#' @param ... other parameters for plot_ly
#'
#' @return plot.ly object
#' @export
#'
#' @examples
#' plotTSNE(vat, title="Example", group.id="cluster", gradient=FALSE)
plotTSNE <- function(vat, title=NULL, group.id = NULL, gradient = FALSE, colors = NULL, source="tsne",...){
  group.data = NULL
  if(!is.null(group.id)){
    group.data <- getCellPropData(vat, group.id)
  }
  plotAnalysis(vat=vat,dims=c(1:2), title=title,key="tSNE", color.data=group.data, gradient=gradient,colors=colors,source=source,...)
}

#' plot PC maps
#' #'
#' @param vat VAT Entity
#' @param x.pc X-axis's PC
#' @param y.pc X-axis's PC
#' @param z.pc Z-axis's PC
#' @param title plot's title
#' @param colors color palette
#' @param source plot's data source for shinyui
#' @param ... other parameters for plot_ly
#'
#' @return plot.ly object
#' @export
plotPC <- function(vat, x.pc, y.pc, z.pc=NULL, title=NULL, color="black", source="pca",...){
  plotAnalysis(vat=vat,dims=c(x.pc, y.pc, z.pc), title=title, key="PCA",colors=color,...)
}

#' Plot some analysis data's Standard Deviation (such as PCA)
#' @param vat VATEntity
#' @param key analyais.key, default PCA
#' @param ndims show pc components
#' @return plot object
#' @export
#'
plotPCASDev <- function(vat, key="PCA",ndims=50, ...){
  if(is.null(vat@analysis[key])){
    stop("Analysis data is not exist")
  }
  sdev <- getAnalysisList(vat, key=key)$sdev
  if(is.null(sdev)){
    stop("Standard deviation is not exist")
  }
  if(ndims<length(sdev)) sdev <- sdev[1:ndims]
  plot.data <- data.frame(x = c(1:length(sdev)), y=sdev)

  p <- plot_ly(plot.data, x = ~x, y = ~y, type = 'scatter', mode = 'lines+markers')
  axis.names <- c("X","Y")
  if(key=="PCA"){
    axis.names[1] <- "PC"
    axis.names[2] <- "Standard Deviation"
  }
  p <- layout(p,
              xaxis = list(title = axis.names[1]),
              yaxis = list(title = axis.names[2]))
  p
}
#' plot gene expression based on the analysis result
#' @param vat vat entity
#' @param genes gene's name for plot
#' @param dims length(dim)=2, 3 (2D or 3D)
#' @param key analysis data key
#' @param gradient default FALSE
#' @param colors color palette
#' @param show.title whether or not show title as gene's name
#' @param show.entity.title whether or not show entity name in the title
#' @export
#'
plotGene <- function(vat, genes, dims=c(1,2), key = "tSNE",
                     gradient = TRUE, colors=c("lightgrey","blue"),
                     show.title=TRUE, show.entity.title=TRUE, ...){
  gene.data <- getUseData(vat,use.genes = genes,drop=FALSE)
  gene.data <- colSums(gene.data)
  if(!gradient){
    gene.data[which(gene.data > 0)] <- 1
    gene.data <- factor(gene.data,levels=c(0,1))
  }
  title <- NULL
  if(show.title){
    title <- paste0(genes,sep=" ",collapse = "")
  }
  if(show.entity.title){
    if(is.null(title)){
      title <- vat@title
    }else{
      title <- paste0(vat@title, "'s ", title)
    }
  }
  plotAnalysis (vat, dims = dims, title=title, key = key, color.data = gene.data,
                           gradient = gradient, colors = colors, ...)
}

#' plot some gene expressions (sometime show many plots) based on the analysis result
#' @param vat vat entity
#' @param genes gene's name for plot
#' @param nrows number of rows for plot
#' @param dims length(dim)=2, 3 (2D or 3D)
#' @param key analysis data key
#' @param gradient default FALSE
#' @param colors color palette
#' @export
#'
plotGenes <- function(vat, genes, nrows=2, dims=c(1,2), key = "tSNE", gradient = TRUE, colors=c("lightgrey","blue"),...){
  plots <- lapply(genes, FUN=function(gene){
    p <- plotGene(vat, gene, dims=dims, key=key, gradient=gradient, show.title=FALSE, colors=colors,...)
  })
  title <- paste0(vat@title,"'s ", paste(genes,sep=", ",collapse=", "))
  p <- subplot(plots, nrows=nrows) %>% layout(showlegend=FALSE) %>% layout(title = title)
  p$elementId <- NULL
  p
}
#' plot two gene expression based on the analysis result at a map
#'
#' @param vat vat entity
#' @param gene1 the first gene name for plot
#' @param gene2 the second gene name for plot
#' @param dims length(dim)=2, 3 (2D or 3D)
#' @param key analysis data key
#' @param colors color palette
#' @export
#'
plotTwoGenes <- function(vat, gene1, gene2, dims=c(1,2), key = "tSNE",
                         colors=c("lightgrey","blue","orange","red"),...){

  #if(length(colors)!=4){
  #  stop("The length of colors must equal 4.")
  #}
  gene1.pos <- which(Matrix::colSums(getUseData(vat, gene1, drop=FALSE)) > 0)
  gene2.pos <- which(Matrix::colSums(getUseData(vat, gene2, drop=FALSE)) > 0)
  both.pos <- intersect(gene1.pos, gene2.pos)

  gene.data <- rep("None",times=nrow(vat@cell.props))
  gene1 <- paste(gene1, sep=", ",collapse=", ")
  gene.data[gene1.pos] <- gene1
  gene2 <- paste(gene2, sep=", ",collapse=", ")
  gene.data[gene2.pos] <- gene2
  gene12 <- paste(gene1, gene2, sep=", ",collapse = ", ")
  gene.data[both.pos] <- gene12
  gene.data <- factor(gene.data,levels=c("None",gene1,gene2,gene12))

  title <- gene12
  plotAnalysis (vat, dims = dims, title=title, key = key, color.data = gene.data,
                gradient = FALSE, colors = colors,...)
}

#' plot three gene expression based on the analysis result at a map
#'
#' @param vat vat entity
#' @param gene1 the first gene name for plot
#' @param gene2 the second gene name for plot
#' @param gene3 the third gene name for plot
#' @param dims length(dim)=2, 3 (2D or 3D)
#' @param key analysis data key
#' @param colors color palette (more colors??8 colors)
#' @export
#'
plotThreeGenes <- function(vat, gene1, gene2, gene3, dims=c(1,2), key = "tSNE",
                         colors=c("lightgrey","blue","orange","green",
                                  "brown","purple","yellow","red"),...){
  gene.data <- rep("None",times=nrow(vat@cell.props))
  genes <- list(gene1,gene2,gene3)

  gene1 <- paste(gene1, sep=", ",collapse=", ")
  gene2 <- paste(gene2, sep=", ",collapse=", ")
  gene3 <- paste(gene3, sep=", ",collapse=", ")
  gene1.2 <- paste(gene1, gene2, sep=", ",collapse=", ")
  gene1.3 <- paste(gene1, gene3, sep=", ",collapse=", ")
  gene2.3 <- paste(gene2, gene3, sep=", ",collapse=", ")
  gene1.2.3 <- paste(gene1, gene2, gene3, sep=", ",collapse=", ")
  gene.level <- c("None" ,gene1, gene2, gene3, gene1.2, gene1.3, gene2.3, gene1.2.3)

  genes.pos <- lapply(c(1:3), function(x){
    return (which( colSums(getUseData(vat, genes[[x]], drop=FALSE)) > 0))
  })
  for(i in c(1:3)){
    gene.data[genes.pos[[i]]] <- gene.level[i+1]
  }
  gene.pos1.2 <- intersect(genes.pos[[1]], genes.pos[[2]])
  gene.pos1.3 <- intersect(genes.pos[[1]], genes.pos[[3]])
  gene.pos2.3 <- intersect(genes.pos[[2]], genes.pos[[3]])
  gene.pos1.2.3 <- Reduce(intersect, genes.pos)
  #gene.pos1.2 <- setdiff(gene.pos1.2, gene.pos1.2.3)
  #gene.pos1.3 <- setdiff(gene.pos1.3, gene.pos1.2.3)
  #gene.pos2.3 <- setdiff(gene.pos2.3, gene.pos1.2.3)
  gene.data[gene.pos1.2] <- gene.level[5]
  gene.data[gene.pos1.3] <- gene.level[6]
  gene.data[gene.pos2.3] <- gene.level[7]
  gene.data[gene.pos1.2.3] <- gene.level[8]

  gene.data <- factor(gene.data, levels=gene.level)
  title <- gene1.2.3
  plotAnalysis (vat, dims = dims, title=title, key = key, color.data = gene.data,
                gradient = FALSE, colors = colors,...)
}
#' plot using analysis data
#' @param vat vat entity
#' @param dims data analysis, dimension index, default c(1:2)
#' @param title plot title, default NULL, name as vat@title, if "", no title
#' @param key analysis data key value
#' @param color.data group data for color
#' @param gradient default FALSE
#' @param colors color palette, if no color.data, uses colors[1]
#' @param source plot id
#' @importFrom plotly plot_ly
#' @export
#'
#' @return p
plotAnalysis <- function(vat, dims = c(1:2), title=NULL, key="tSNE", color.data = NULL,
                         gradient = FALSE, colors = NULL, source="src",...){
  if(!(key %in% names(vat@analysis))){
    stop(sprintf("No %s result, please run analysis program first",key))
  }
  if(length(dims) < 2 || length(dims) > 3){
    stop("Only plot 2D or 3D maps")
  }
  twoD <- (length(dims)==2)
  if (is.null(title)) title <- vat@title
  plot.data <- getAnalysisData(vat, key, cols =dims,as.data.frame = TRUE)
  if(twoD){
    colnames(plot.data) <- c("X","Y")
  }else{
    colnames(plot.data) <- c("X","Y","Z")
  }
  if(!is.null(color.data)){
    if(!gradient & !is.factor(color.data)) color.data <- factor(color.data)
    plot.data$color <- color.data
  }
  if(is.null(color.data)){
    if(!is.null(colors)) colors = I(colors[1])
    if(twoD){
      p <- plot_ly(plot.data, x = ~X, y = ~Y, source=source, color=colors,...)
    }else{
      p <- plot_ly(plot.data, x = ~X, y = ~Y, z = ~Z, source=source, color=colors,...)
    }
  }else{
    if(twoD){
      p <- plot_ly(plot.data, x = ~X, y = ~Y, color = ~color, source=source, colors=colors,...)
    }else{
      p <- plot_ly(plot.data, x = ~X, y = ~Y, z = ~Z, color = ~color, source=source, colors=colors,...)
    }
  }
  axis.names <- getAnalysisColName(key, dims)
  p <- p %>% add_markers() %>% layout(dragmode="select")
  if(twoD){
    p <- layout(p,
                xaxis = list(title = axis.names[1]),
                yaxis = list(title = axis.names[2]))
  } else {
    p <- layout(p,
                scene = list(xaxis = list(title = axis.names[1]),
                             yaxis = list(title = axis.names[2]),
                             zaxis = list(title = axis.names[3]))
    )
  }
  if(!isEmpty(title)){
    p <- layout(p, title=title)
  }
  p$elementId <- NULL
  p
}
