### DATA CLEANER II ###

#import
loadedDataset <- read.csv("~/Desktop/Data Viz - Project 1/Project/data/dataof2014sexDistinction.csv", stringsAsFactors=FALSE)

Dataset2014 <- loadedDataset[loadedDataset$year == 2014,]
DatasetTot <- Dataset2014[Dataset2014$sex == 0,]

#remove unwanted columns
drops <- c("sex")
data<-DatasetTot[,!(names(DatasetTot) %in% drops)]

#only distribution
drops <- c("stateName", "year")
distribution<-data[,!(names(data) %in% drops)]

finalDataset <- cbind("prova", 1, 2)
i=0
j = 0
for(i in 1:228) {
  country <- data[i,]$stateName
  for(j in 1:85) {
    age <- j-1
    finalDataset <-rbind(cbind(country, age, distribution[i,j]), finalDataset)
  }
}

invertedDataset <- cbind("prova", 1, 2)
for(h in 1:19380) {
  invertedDataset <-rbind(finalDataset[h, ], invertedDataset)
}


write.table(invertedDataset, file = "world_ages_2014.csv",row.names=FALSE, na="",col.names=TRUE, sep=",")
