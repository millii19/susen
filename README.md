# susen
Susen Calculator



## Sources:
- Hourly past prices: smard.eu
Sample Request:
```
 curl -X POST -H "Content-Type: application/json" -d '{"request_form":[{"format":"CSV","moduleIds":[8004170],"region":"AT","timestamp_from":1658268000000,"timestamp_to":1659218399999,"type":"discrete","language":"de"}]}' https://www.smard.de/nip-download-manager/nip/download/market-data
```
- Weatherdata: https://data.hub.zamg.ac.at/