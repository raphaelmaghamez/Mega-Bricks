function StartTimer(duration,display){

    let timer = duration,minutes,seconds;

    const cron = setInterval ( function() {
        minutes = parseInt(timer/60,10);
        //console.log(minutes);
        seconds = parseInt(timer%60,10);
        //console.log(seconds);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;

        if(--timer<0)
        {
            clearInterval(cron);
        }

    },1000);


}

export { StartTimer };


