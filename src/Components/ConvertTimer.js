export default function converTimer(miliSeconds){
    let allSeconds=miliSeconds/1000 //segundos
    let minutes =Math.trunc(allSeconds/60) //minutso
    let seconds =allSeconds - (minutes*60)//segundos

    return minutes.toString().padStart(2,'0')+ ':'+ seconds.toString().padStart(2,'0')
}