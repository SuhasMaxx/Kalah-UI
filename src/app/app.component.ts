import { Component } from '@angular/core';
import { PitBlockComponent } from './pit-block/pit-block.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  player1Home = {index:0, value:0};
  player2Home = {index:0, value:0};
  player1pits = [];
  player2pits = [];
  loading = false;
  errorMsg = '';
  timer = 0;
  title = 'swagger-ui';
  gameStarted = false;
  gameData = {
    id: 0
  };
  serverURL_N = 'http://192.168.178.24:8080/';
  serverURL = 'http://localhost:3000/';
  currentPlayer= 1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.processPitData({
      "1": 6,
      "2": 6,
      "3": 6,
      "4": 6,
      "5": 6,
      "6": 6,
      "7": 0,
      "8": 6,
      "9": 6,
      "10": 6,
      "11": 6,
      "12": 6,
      "13": 6,
      "14": 0
    });
  }

  isPlayer1Turn(){
    return this.currentPlayer == 1;
  }

  isPlayer2Turn(){
    return this.currentPlayer == 2;
  }

  startGame(){
    // TEST GET CALL 

    /* let getheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.serverURL,
      'Access-Control-Allow-Methods': "POST, GET, PUT, OPTIONS, PATCH, DELETE" });
    let getoptions = { headers: getheaders }; */
    this.loading = true;
    this.http.get('http://localhost:3000/startGame')
    .subscribe(
      (data:{id: string, url: string}) => {
        this.loading = false;
        console.log(data);
        debugger;
      }
    )


    /* let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.serverURL });
    let options = { headers: headers }; */
    this.loading = true;
    this.http.post(this.serverURL+'startGame',{})
    .subscribe(
      (data:{id: string, url: string}) => {
        this.loading = false;
        console.log(data);
        this.gameData.id = Number(data.id);
        this.gameStarted = !this.gameStarted;
        this.currentPlayer = 1;
      }
    );
    interval(1000).subscribe(x => {
      this.timer++;
    });
  }

  /* startNewGameCall(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.serverURL });
  let options = { headers: headers };
    this.http.post(this.serverURL+'games',{}, options);
    //console.log(data);
    this.gameStarted = !this.gameStarted
  } */

  processPitData(pitData:Object){
    this.player1pits.length = 0;
    this.player2pits.length = 0;
    var attribs = Object.getOwnPropertyNames(pitData);
    for (let i = 0; i < attribs.length; i++) {
      const attrib = attribs[i];
      if(i < 6){
        this.player1pits.push({"index":attrib, "value":pitData[attrib]})
      } else if(i == 6){
        this.player1Home = {
          'index':Number(attrib), 
          'value':pitData[attrib]
        }
      } else if(i > 6 && i < 13){
        this.player2pits.push({"index":attrib, "value":pitData[attrib]})
      } else {
        this.player2Home = {
          'index':Number(attrib), 
          'value':pitData[attrib]
        }
      }
    }
  }

  getGameStatus(){
    /* let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.serverURL,
      'Access-Control-Allow-Methods': "POST, GET, PUT, OPTIONS, PATCH, DELETE" });
    let options = { headers: headers }; */
    this.loading = true;
    this.http.get(this.serverURL+'games/status/'+this.gameData.id)
    .subscribe(
      (data:{id: string, url: string}) => {
        this.loading = false;
        console.log(data);
        debugger;
      }
    )
  };

  getStonesOfPit(pit: {"index": Number, "value": number}){
    return Array(pit.value);
  }

  changePlayer(){
    if(this.currentPlayer == 1){
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  selectedPit(pit: {"index": Number, "value": number}){
    if(pit.value === 0){
      this.errorMsg = 'Please select non-empty pit.';
      setTimeout(() => {
        this.errorMsg = '';
      }, 2000);
      return;
    }
    // Fire event for number
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.serverURL,
      'Access-Control-Allow-Methods': "POST, GET, PUT, OPTIONS, PATCH, DELETE" 
    });
    let options = { headers: headers };
    this.loading = true;
    this.http.put(this.serverURL+'games/'+this.gameData.id+'/pits/'+pit.index,{}, options)
    .subscribe(
      (data:{id: string, url: string, status: object}) => {
        this.loading = false;
        console.log(data);
        this.processPitData(data.status);
        this.changePlayer();
      },
      (error: {code: string, msg: string, status: number}[]) => {
        this.loading = false;
        this.errorMsg = 'Wrong Player. It\'s Player '+this.currentPlayer+'\'s turn';
        setTimeout(() => {
          this.errorMsg = '';
        }, 2000);
      }
    )
    //this.getGameStatus();
  }
};

interface GameObject {
    id: Number;
    url: String;
  }