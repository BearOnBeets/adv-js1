fetch('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        temp={}
        output=[]
        console.log("All the data from the api:")
        console.log(data)
        for(i=0;i<data.length;i++)
        {
            temp.Airport= data[i].Airport.Code
            temp.Cancelled=data[i].Statistics.Flights.Cancelled
            temp.Delayed=data[i].Statistics.Flights.Delayed
            temp.Diverted=data[i].Statistics.Flights.Diverted
            temp.OnTime=data[i].Statistics.Flights['On Time']
            temp.Total=data[i].Statistics.Flights.Total
            output[i]=Object.assign({}, temp)

        }        
        var out = output.reduce(function(o, cur) {
            var occurs = o.reduce(function(n, item, i) {
              return (item.Airport === cur.Airport) ? i : n;
            }, -1);
            if (occurs >= 0) {
              o[occurs].Cancelled = o[occurs].Cancelled+cur.Cancelled;
              o[occurs].Delayed = o[occurs].Delayed+cur.Delayed;
              o[occurs].Diverted = o[occurs].Diverted+cur.Diverted;
              o[occurs].OnTime = o[occurs].OnTime+cur.OnTime;
              o[occurs].Total = o[occurs].Total+cur.Total;
            } else {
              var obj = {
                Airport: cur.Airport,
                Cancelled: cur.Cancelled,
                Delayed: cur.Delayed,
                Diverted: cur.Diverted,
                OnTime: cur.OnTime,
                Total: cur.Total
              };
              o = o.concat([obj]);
            }
          
            return o;
        }, []);
        console.log("Cancelled, delayed, diverted, on time flights for all airports:")
        console.log(out);
        console.log("Airports where sum is not equal to total value:")
        for(i=0;i<out.length;i++)
        {
            if(out[i].Cancelled+out[i].Delayed+out[i].Diverted+out[i].OnTime!=out[i].Total)
            {
                console.log(out[i].Airport)
            }
        }

    })
    .catch(function(err) {
        console.log(err);
    });

    