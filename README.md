# susen
*Sustainable Energy Calculator*

Everybody knows the problems of climate change, so what can we do about it?

By promoting sustainable energy, we can increasing the flow of capital into sustainable energy projects and their development. 

Susen helps investors, such as NGOs, private households and cooperatives, to make unspeculative decisions about renewable energy projects. 
Instead of pretending to know the future, susen relies on past hourly weather and electricity price data to explain to the user if a project might be profitable.
Additionally, it makes renewable energy projects more transparent and relatable.


## Sources:
- Hourly past prices: https://www.smard.de/

Sample Request:
```
 curl -X POST -H "Content-Type: application/json" -d '{"request_form":[{"format":"CSV","moduleIds":[8004170],"region":"AT","timestamp_from":1658268000000,"timestamp_to":1659218399999,"type":"discrete","language":"de"}]}' https://www.smard.de/nip-download-manager/nip/download/market-data
```
- Weatherdata: https://data.hub.zamg.ac.at/