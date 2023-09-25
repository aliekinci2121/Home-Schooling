const chilNameInput=document.getElementById("childName")
const startButton=document.getElementById("startButton")
const questionContainer=document.getElementById("questionContainer")
const CheckButton=document.getElementById("checkButton")
const resultMessage=document.getElementById("resultMessage")
const restartButton=document.getElementById("restartButton")
const scoreboard=document.getElementById("scoreboard")


let currentChildName=""
let correntQuestionIndex=0
let correctAnwers=0
let questions=[]


startButton.addEventListener("click",StartGame)
CheckButton.addEventListener("click",checkAnswe)
restartButton.addEventListener("click",restartGame)

function StartGame(){
    currentChildName=chilNameInput.value
    if(!currentChildName){
        alert("Lütfen cocugunuzun ismini giriniz.")
        return
    }
    generateQuestions()
    showQuestion()
    startButton.disabled=true
}

//sorulari olustur
function generateQuestions(){
    questions=[]
    for(let i=1;i<=10;i++){
        const num1=Math.floor(Math.random()*10)+1
        const num2=Math.floor(Math.random()*10)+1
        const answer=num1*num2
        questions.push({num1,num2,answer})
    }
}

//soruyu goster
function showQuestion(){
    if(correntQuestionIndex<questions.length){
        const question=questions[correntQuestionIndex]
        questionContainer.innerHTML=`${question.num1}x${question.num2}=<input type="number" id="userAnswer">`
    }else{
        endGame()
    }
}
//! cevabi almak icin kullanacagimiz fonksiyon
function checkAnswe(){
   const userAnswerInput=document.getElementById("userAnswer")
   if(!userAnswerInput){
    return
   }
   const userAnswer=parseInt(userAnswerInput.value)
   const question=questions[correntQuestionIndex] //?mevcut sorunun dizideki pozisyonunu almak icin bu kodu kullaniriz

   if(userAnswer===question.answer){
    correctAnwers++
   }
   correntQuestionIndex++
   userAnswerInput.value=""  //? kullanicinin girdigi input alanini temizleriz ki,kullanici yeni bir cevap girsin

   showQuestion()
   
}

//? oyun sona erdiginde...
function endGame(){
    questionContainer.innerHTML=""
    resultMessage.innerText=`${currentChildName},${correctAnwers} dogru cevap!`//?oyun sona erdiginde bir 'kullanici adi ve kactane dogru cevap vermis ise ekrana gelir'
    saveScore(currentChildName,correctAnwers)//kulnici ismi ve dogru cevap sayisini saklariz
    showScores()
    restartButton.disabled=false// yeniden baslatma dügmesini aktif hale getiririz
}
//!ismi ve toplanan puanlari depolamak icin...
function saveScore(name,score){
    let scores=JSON.parse(localStorage.getItem("scores"))|| []
    scores.push({name,score})
    localStorage.setItem("scores",JSON.stringify(scores))
}
function showScores(){
    scoreboard.innerHTML=""
    let scores=JSON.parse(localStorage.getItem("scores"))
    scores.sort((a,b)=>b.score-a.score)//?puanlari yüksekten düsüge dogru siralama icin kullanilir
    scores.forEach((score,index) => {
        const li=document.createElement("li")
        li.innerText=`${index + 1}. ${score.name}: ${score.score} doğru cevap`
        scoreboard.appendChild(li)
    });
}

function restartGame(){
    currentChildName=""
    correntQuestionIndex=0
    correctAnwers=0
    questions=[]
    chilNameInput.value=""
    questionContainer.innerHTML=""
    resultMessage.innerText=""
    startButton.disabled=false
    restartButton.disabled=true
    scoreboard.innerHTML=""
}