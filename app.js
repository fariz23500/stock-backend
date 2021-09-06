const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const data=require('./StockList.json');
const Cors=require("cors");
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let symbol;
let start;
let end;

app.post("/",function(req,res){
    symbol=req.body.symbol;
   start=req.body.start;
    end=req.body.end;
    // const symbol="GOOG";
    // const start="2021-01-12";
    // const end="2021-02-01";
    const requiredData=[];
    // console.log(Number(start.substr(8,2)));
    data.forEach(d => {
    //    if(Number(d.date.substr(5,2))>Number(end.substr(5,2))&&Number(d.date.substr(8,2))>Number(end.substr(8,2)))return;
        if(d.symbol===symbol&&Number(d.date.substr(5,2))>=Number(start.substr(5,2))&& Number(d.date.substr(5,2))<=Number(end.substr(5,2)))
       { 
        if(Number(d.date.substr(5,2))===Number(end.substr(5,2))&&Number(d.date.substr(5,2))===Number(start.substr(5,2)) )
        {
            if(Number(d.date.substr(8,2))>=Number(start.substr(8,2))&&Number(d.date.substr(8,2))<=Number(end.substr(8,2)))
            {
                requiredData.push({"symbol":d.symbol,
                "open": d.open,
                "close":d.close,
                "high":d.high,
                "low":d.low,
                "date":d.date
        
            });
            }
        }

           else if(Number(d.date.substr(8,2))>=Number(start.substr(8,2)) &&Number(d.date.substr(5,2))===Number(start.substr(5,2)))
           {
            requiredData.push({"symbol":d.symbol,
            "open": d.open,
            "close":d.close,
            "high":d.high,
            "low":d.low,
            "date":d.date
    
        });
           }
           else if(Number(d.date.substr(8,2))<=Number(end.substr(8,2)) &&Number(d.date.substr(5,2))===Number(end.substr(5,2)))
           {
            requiredData.push({"symbol":d.symbol,
            "open": d.open,
            "close":d.close,
            "high":d.high,
            "low":d.low,
            "date":d.date
    
        });
           }
           else if(Number(d.date.substr(5,2))!==Number(end.substr(5,2))&&Number(d.date.substr(5,2))!==Number(start.substr(5,2)) ){
            requiredData.push({"symbol":d.symbol,
            "open": d.open,
            "close":d.close,
            "high":d.high,
            "low":d.low,
            "date":d.date
    
        });
           }
      }
    });
   res.send(requiredData); 
});

app.get("/",(req,res)=>{
    res.send({"symbol":symbol,"start":start,"end":end});
})







app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
})