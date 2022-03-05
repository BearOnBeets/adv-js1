fetch('http://api.nobelprize.org/v1/prize.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        people=[]
        console.log("All the data from the api:")
        console.log(data)
        console.log("All the data from the api between the year 2000 to 2019:")
        for(i=0;i<data.prizes.length;i++)
        {
            if('year' in data.prizes[i] && data.prizes[i].year>=2000 && data.prizes[i].year<=2019)
            {
                console.log(data.prizes[i])
                if('category' in data.prizes[i] && data.prizes[i].category=='chemistry')
                {
                    for(j=0;j<data.prizes[i].laureates.length;j++)
                    {
                        people.push(data.prizes[i].laureates[j].firstname+" "+data.prizes[i].laureates[j].surname)
                    }
                }
            }   
        }
        console.log("All the people from the api between the year 2000 to 2019 who won a prize in chemistry:")
        console.log(people)
    })
    .catch(function(err) {
        console.log(err);
      });

    