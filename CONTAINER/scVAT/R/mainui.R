#' Graphical User Interface for Single-Cell Visual Analysis Toolkit
#'
#' start shiny app UI for scVAT
#'
#' @param data_name VAT Entity name (charcter)
#'
#' @author thbin
#'
#' @import shiny
#' @import shinydashboard
#' @import plotly
#' @importFrom DT dataTableOutput renderDataTable
#' @export
#'
#' @examples
#'
startVATGUI<-function(data_name){
  require(shiny)
  require(shinydashboard)
  require(plotly)
  vat <- .GlobalEnv[[data_name]]
  avail.group <- c("Choose one"="",getPropMeta(vat,"Group"))
  avail.analysis.key <- c("Choose one" = "", getAnalysisKey(vat))
  diffData <- data.frame()
  diff.method <- c("t","wilcox","DESeq2")
  app <- shinyApp(
    ui <- dashboardPage(
      dashboardHeader(title = "Single-Cell Visual Analysis Toolkit",titleWidth = 450), skin="black",
      dashboardSidebar(
        sidebarMenu(
          menuItem("Analysis Visualization", tabName="analysisPage",icon=icon("spinner"))
          ,menuItem("Plot Clustering",tabName="clusterPage",icon=icon("spinner"))
          ,menuItem("Manual Clustering", tabName="manualClusterPage",icon=icon("certificate"))
          ,menuItem("Differential Analysis", tabName="diffPage",icon=icon("compass"))
        )
      ),
      dashboardBody(
        tabItems(
          tabItem(tabName="clusterPage",
                  fluidRow(
                    box(width=12, status="success",
                        HTML("<h4>Plot Clustering</h4>")
                    ),
                    fluidRow(
                      column(width = 8,
                             plotlyOutput("clusterPlot",height="600px")
                      ),
                      column(width = 4,
                             selectInput("clusterAnalysisKey","Analysis Data:",avail.analysis.key)
                             ,uiOutput("chooseClusterPlotDims")
                             ,selectInput("clusterGroup","Group:",avail.group, selected=avail.group[2])
                             #,selectInput("tsneShape","Shape:",avail.group,selected=avail.group[1])
                             #,sliderInput("tsne", "Number of observations:", 1, 100, 50)
                      )
                    )
                  )
          ),
          tabItem(tabName="manualClusterPage",
                   fluidRow(
                     box(width = 12, status="success",
                         HTML("<h4>Clustering the cells manually based on Analysis Data (2D)</h4>")
                     ),
                     fluidRow(
                       column(width = 8,
                              plotlyOutput("manualClusterPlot",height="600px")
                       ),
                       column(width = 4,
                              selectInput("manualClusterAnalysisKey","Analysis Data:",avail.analysis.key)
                              ,uiOutput("chooseManualClusterPlotDims")
                              #,sliderInput("tsne", "Number of observations:", 1, 100, 50)
                              ,numericInput("manualSetGroup","Group Id:","0")
                              ,wellPanel(
                                actionButton("saveManual","Save")
                                ,actionButton("refreshManual","Refresh")
                                ,actionButton("resetManual","Reset")
                              )
                              , checkboxInput("manualClusterShowGene", "Show Gene Expression", FALSE)
                              , textInput("manualClusterGene","Gene:","")
                              , textInput("manualClusterColor","Color:","lightgrey,blue")
                       )
                     )
                   )

          ),
          tabItem(tabName="diffPage",
                  fluidRow(
                    box(width = 12, status="success",
                        HTML("<h4>Differentializing Analysis</h4>")
                    ),
                    fluidRow(
                      box(width=12,
                        column(width=10,
                          div(style = "display:inline-block",selectInput("diffGroup"," Cluster: ",avail.group,selected=avail.group[2]))
                          ,div(style = "display:inline-block",selectInput("diffMethod"," Method: ",diff.method,selected=diff.method[1]))
                          ,div(style = "display:inline-block",uiOutput("chooseDiffGroup1"))
                          ,div(style = "display:inline-block",uiOutput("chooseDiffGroup2"))
                          ,div(style = "display:inline-block",numericInput("diffLogFC","Min. LogFC:",0.25,min=0, max=1,step=0.01))
                          ,div(style = "display:inline-block",numericInput("diffAvg","Min. AVG:",0.1,min=0, max=1,step=0.01))
                          ,div(style = "display:inline-block",checkboxInput("diffOnlyPos","Only Postive",FALSE))
                        ),
                        column(width=2,
                               actionButton("diffDo","Calculate",icon=icon("play")),
                               downloadButton("diffDownload","Download")
                               )
                      ),
                      wellPanel(width=12,
                                DT::dataTableOutput("diffDataTable", width="100%")
                      )
                    )
                  )

          ),
          tabItem(tabName="analysisPage",
                  fluidRow(
                    box(width=12, status="success",
                        HTML("<h4>All Kinds of Analysis Data Visualization</h4>")
                    ),
                    fluidRow(
                      column(width = 8,
                             plotlyOutput("analysisPlot",height="600px")
                      ),
                      column(width = 4,
                             uiOutput("chooseAnalysisKey"),
                             uiOutput("choosePlotDims"),
                             textInput("analysisGene1","Gene1:",""),
                             textInput("analysisGene2","Gene2:",""),
                             textInput("analysisGene3","Gene3:",""),
                             textInput("analysisColor","Color:","lightgrey,blue,orange,red"),
                             checkboxInput("analysisGradient", "Gradient", TRUE)
                             ,checkboxInput("analysisMultiPlot","Plot Multiple Genes", FALSE)
                             ,numericInput("analysisPlotRows","Number of Rows:",2, min = 1,step = 1)
                      )
                    )
                  )
          )
        )
      )
    ),
    server <- function(input, output, session){

      notify.id <- NULL

      data <- reactive(
        eval(parse(text=data_name))
      )
      #Start Clustering Plot
      output$chooseClusterPlotDims <- renderUI({
        key <- input$clusterAnalysisKey
        if(isEmpty(key)) return()
        dims <- getAnalysisColnames(vat = vat,key=key)
        selectInput("clusterPlotDims", "Plot Dims",dims, multiple=TRUE)
      })
      output$clusterPlot <- renderPlotly({
        key <- input$clusterAnalysisKey
        if(isEmpty(key)) {
          return ()
        }
        dims <- input$clusterPlotDims
        if(is.null(dims)) return()
        if((length(dims)<2)||(length(dims)>3)){
          return()
        }
        size <- NULL
        sizes <- NULL
        if(length(dims)==3){
          size <- 1
          sizes <- c(1:5)
        }
        group.key <- input$clusterGroup
        if(isEmpty(group.key)) return()
        group.data <- getCellPropData(vat, group.key)
        plotAnalysis(vat, dims= dims, key = key, color.data = group.data, gradient = FALSE, source="clusterP", size=size, sizes=sizes)
      })
      #End Clustering Plot

      #Start Manual Clustering
      output$chooseManualClusterPlotDims <- renderUI({
        key <- input$manualClusterAnalysisKey
        if(isEmpty(key)) return()
        dims <- getAnalysisColnames(vat = vat,key=key)
        selectInput("clusterManualPlotDims", "Plot Dims",dims, multiple=TRUE)
      })
      output$manualClusterPlot <- renderPlotly({
        input$refreshManual

        key <- input$manualClusterAnalysisKey
        if(isEmpty(key)) {
          return ()
        }
        dims <- input$clusterManualPlotDims
        if(is.null(dims)) return()
        if(length(dims)!=2){
          return()
        }
        if(!input$manualClusterShowGene){
          group.data <- getCellPropData(vat, "manual.cluster")
          plotAnalysis(vat, dims=dims, key = key, title="", color.data=group.data, gradient = TRUE, source="manualCP")
        }else{
          gene <- input$manualClusterGene
          gene <- strsplit(gene, split=",")[[1]]
          colors <- input$manualClusterColor
          colors <- strsplit(colors,split=",")[[1]]
          if(length(gene)>=1){
            plotGene(vat, gene, dims=dims, key = key, gradient = TRUE, colors = colors[1:2], source="manualCP")
          }else return()
        }
      })
      observeEvent(input$saveManual,{
        selected_data <- event_data("plotly_selected",source="manualCP")
        if(length(selected_data)>0){
          val <- input$manualSetGroup
          select_id <- selected_data$pointNumber + 1
          vat@cell.props$manual.cluster[select_id] <<- as.numeric(val)
        }
      })
      observeEvent(input$resetManual,{
        vat@cell.props$manual.cluster <<- 0
      })
      #End Manual Clustering

      #Start Analysis Visualization
      output$analysisPlot <- renderPlotly({
        key <- input$analysisKey
        if(isEmpty(key)) {
          return ()
        }
        dims <- input$plotDims
        if(is.null(dims)) return()
        if(length(dims)<2 || length(dims)>3){
          return()
        }

        gene1 <- input$analysisGene1
        gene2 <- input$analysisGene2
        gene3 <- input$analysisGene3
        colors <- input$analysisColor
        colors <- strsplit(colors,split=",")[[1]]
        size <- NULL
        sizes <- NULL
        if(length(dims)==3){
          size <- 1
          sizes <- c(1:5)
        }
        if(isEmpty(gene1)){
          plotAnalysis(vat,key = key, dims=dims, source="analysisP",size=size, sizes=sizes)
        }else{
          gene1 <- strsplit(gene1,split=",")[[1]]
          if(input$analysisMultiPlot && length(dims)==2){#3d plot.ly doesn't work!
            plotGenes(vat, gene1, nrows = input$analysisPlotRows, dims=dims,
                              key = key, gradient = input$analysisGradient,
                              colors = colors[1:2],size=size, sizes=sizes)
          }else{
            if(isEmpty(gene2)){
              plotGene(vat, gene1, dims=dims,
                       key = key, gradient = input$analysisGradient,
                       colors = colors[1:2],size=size, sizes=sizes)
            }else{
              gene2 <- strsplit(gene2,split=",")[[1]]
              if(isEmpty(gene3)){
                plotTwoGenes(vat, gene1, gene2, dims=dims,
                             key = key,colors=colors,size=size, sizes=sizes)
              }else{
                gene3 <- strsplit(gene3,split=",")[[1]]
                plotThreeGenes(vat, gene1, gene2, gene3, dims=dims,
                             key = key,colors=colors,size=size, sizes=sizes)

              }
            }
          }
        }
      })
      output$chooseAnalysisKey <- renderUI({
        selectInput("analysisKey","Analysis Data:",avail.analysis.key,selected=avail.analysis.key[1])
      })
      output$choosePlotDims <- renderUI({
        key <- input$analysisKey
        if(isEmpty(key)) return()
        dims <- getAnalysisColnames(vat = vat,key=key)
        selectInput("plotDims", "Plot Dims",dims, multiple=TRUE)
      })
      #End Analysis Visualization

      #Start Defferential Analysis
      output$chooseDiffGroup1 <- renderUI({
        input$saveManual
        input$resetManual
        group.key <- input$diffGroup
        all.groups <- sort(unique(vat@cell.props[,group.key]))
        all.groups <- c(as.character(all.groups),"All")
        selectInput("diffGroup1"," Group 1: ",all.groups,multiple = TRUE)
      })
      output$chooseDiffGroup2 <- renderUI({
        input$saveManual
        input$resetManual
        group.key <- input$diffGroup
        all.groups <- sort(unique(vat@cell.props[,group.key]))
        all.groups <- c("Choose one"="",as.character(all.groups))
        selectInput("diffGroup2"," Group 2: ",all.groups,multiple = TRUE)
      })
      observeEvent(input$diffDo,{
        notify.id <<- showNotification("Calculating differences, Please waiting...",duration=NULL)
        group.key <- input$diffGroup
        group1 <- input$diffGroup1
        group2 <- input$diffGroup2
        if(isEmpty(group2)) group2 <- NULL
        method <- input$diffMethod
        diffLogFC <- input$diffLogFC
        diffAvg <- input$diffAvg
        only.pos <- input$diffOnlyPos
        if("All" %in% group1){
          diffData <<- tryCatch({
            doAllDiffAnalysis(
              vat, group.key = group.key,method = method,
              min.logfc = diffLogFC, min.avg = diffAvg, only.pos = only.pos
            )
          }, error = function(cond){
            removeNotification(notify.id)
            showNotification(sprintf("Run Error: %s",cond),type="error", duration=10)
            return(NULL)
          }
          )
        }else{
          diffData <<- tryCatch({
            doDiffAnalysis(
              vat, group1 = group1, group2 = group2, group.key = group.key,
              method = method,
              min.logfc = diffLogFC, min.avg = diffAvg, only.pos = only.pos
            )
          }, error = function(cond){
            removeNotification(notify.id)
            showNotification(sprintf("Run Error: %s",cond),type="error", duration=10)
            return(NULL)
          }
          )
        }
      })
      output$diffDownload <- downloadHandler(
        filename = function(){
          diffLogFC <- input$diffLogFC
          paste0("diff_", diffLogFC, ".csv")
        },
        content = function(file){
          write.csv(diffData, file, row.names = FALSE)
        }
      )
      output$diffDataTable <- DT::renderDataTable({
        input$diffDo
        if (!is.null(notify.id)) removeNotification(notify.id)
        notify.id <<- NULL
        diffData
      }#,options=list(searching=FALSE,pageLength = 20)
      )
      #End Defferential Analysis

      session$onSessionEnded(function(){
        .GlobalEnv[[data_name]] <- vat
        stopApp()
        })
    }
  )
  #shinyApp(ui, server, options = list(launch.browser=TRUE))
  runApp(app, launch.browser = TRUE)
}
