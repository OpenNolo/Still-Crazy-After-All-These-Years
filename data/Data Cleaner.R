###DATA CLEANER###

### Read Data
loadeddata =  read.csv("~/Desktop/Data Viz - Project 1/Project/data/SC-EST2014-AGESEX-CIV.csv")

### Take only total data
mydata = loadeddata[loadeddata$SEX == 0,]

### Remove useless attributes and take data by year
data2010 = data.frame(mydata$NAME, mydata$AGE, mydata$POPEST2010_CIV)
data2011 = data.frame(mydata$NAME, mydata$AGE, mydata$POPEST2011_CIV)
data2012 = data.frame(mydata$NAME, mydata$AGE, mydata$POPEST2012_CIV)
data2013 = data.frame(mydata$NAME, mydata$AGE, mydata$POPEST2013_CIV)
data2014 = data.frame(mydata$NAME, mydata$AGE, mydata$POPEST2014_CIV)

### Save the dataframes as csv
write.table(data2014, file = "USA_ages_2014.csv",row.names=FALSE, na="",col.names=TRUE, sep=",")


