
isEmpty <- function(var){
  if(is.null(var)) return(TRUE)
  if(is.na(var)) return(TRUE)
  if(is.character(var) && nchar(trimws(var))==0) return(TRUE)
  return(FALSE)
}

logging <- function(text,...)
{
  cat(sprintf(paste(Sys.time(), text,"\n")))
}
