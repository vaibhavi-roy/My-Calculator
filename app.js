let string="";
let buttons=document.querySelectorAll('.button')
const operations = ["+", "-", "*", "/", ""];
const upperValue = document.querySelector('.val');

const equals = function(){
    upperValue.innerHTML = string;
    string = eval(string);
    document.querySelector('input').value = string;
}
document.addEventListener('keydown',function(e){
    if(isFinite(e.key) || operations.includes(e.key))
    {
        string += e.key;
        document.querySelector('input').value = string;
    }
    else if(e.key === "Enter"){
        equals();
    }
    
})
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML== '='){
            
            equals();
        }
        else if (e.target.closest('button').classList.contains('back')){
            string = string.slice(0,-1);
            document.querySelector('input').value = string
        }
        else if(e.target.innerHTML=='C'){
            string = "";
            document.querySelector('input').value = string;
            upperValue.textContent =""
        }
        else if(e.target.innerHTML == "%"){
            if (string === "" && e.target.innerHTML === "%") {
                document.querySelector('input').value = "";
            }
            const end = string.length;
            let operatorUsed ="";
            let percentageValue = "" ;
            let beforeNumber = "";
            for(let i =end-1;i>=0;i--){
                if (operations.includes(string[i])){
                    percentageValue = string.slice(i+1);
                    operatorUsed = string[i];
                    for(let j = i-1;j>=0;j--){
                        
                        if(operations.includes(string[j])){
                            beforeNumber = string.slice(j+1,i);
                            const temp = string.split("");
                            temp.splice(j+1);
                            string = temp.join("");
                            break;
                        }
                        else if(j===0){
                            beforeNumber = string.slice(0,i);
                            string="";
                        }
                        
                    }
                    break;
                }
            }

            const evaluatedPercent = (Number(percentageValue) /100 * Number(beforeNumber));
            let evaluatedValue=0;
           if(beforeNumber === ""){
            evaluatedValue = percentageValue /100;
           }
            else if(operatorUsed === "+"){
                evaluatedValue = Number(beforeNumber) + evaluatedPercent;
            }
            else if(operatorUsed === "-"){
                evaluatedValue = Number(beforeNumber) - evaluatedPercent;
            }
            else if(operatorUsed === "*"){
                evaluatedValue = evaluatedPercent;
            }
            else if (operatorUsed === "/"){
                evaluatedValue = Number(beforeNumber)*100/ ((Number(percentageValue)));
            }

            evaluatedValue = (evaluatedValue.toFixed(2));
            string += String(evaluatedValue);
            document.querySelector('input').value = string;
            
        }
        else{
            if (operations.includes(String(string).at(-1)) && operations.includes(e.target.innerHTML)){
                string = string.slice(0,-1) + e.target.innerHTML;
                document.querySelector('input').value = string;
            }
            else if (string === "" && operations.includes(e.target.innerHTML) || e.target.innerHTML ==="%" ){
                document.querySelector('input').value = "";
            }
            else{
                string = string + e.target.innerHTML;
                document.querySelector('input').value = string;
            }
            
        }
        
    })
})