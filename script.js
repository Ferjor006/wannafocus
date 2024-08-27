/* ALL VARIABLES OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO*/
// Colors 
const rootStyles = getComputedStyle(document.documentElement);
var root = document.documentElement;
const principal_web_color = rootStyles.getPropertyValue('--principal_web_color');
const second_web_color = rootStyles.getPropertyValue('--second_web_color');
const third_web_color = rootStyles.getPropertyValue('--third_web_color');
const secondVariant_web_color = rootStyles.getPropertyValue('--secondVariant_web_color');
const thirdVariant_web_color = rootStyles.getPropertyValue('--thirdVariant_web_color');
const forBoxShadow_color = rootStyles.getPropertyValue('--forBoxShadow_color');
var backgroundColor_var = "#1d1f35";
// Settings
    /* buttons */
const settings_button_B1 = document.querySelector('.settings_button_B1');
const settings_button_B2 = document.querySelector('.settings_button_B2');
const settings_button_B3 = document.querySelector('.settings_button_B3');
const settings_button_B4 = document.querySelector('.settings_button_B4');
    /* visuals */
const section_two = document.getElementById('section_two');
const settings_section_one = document.querySelector('.settings_section_one');
const settings_section_two = document.querySelector('.settings_section_two');
const settings_section_three = document.querySelector('.settings_section_three'); 
const settings_section_four = document.querySelector('.settings_section_four'); 
// Timer
    /* Circle Indicator and Pause and Restart Buttons */ 
const timer_circle_indicator = document.getElementById('timer_circle_indicator');
const startButtonFocus = document.querySelector('.startButtonFocus');
const startButtonBreak = document.querySelector('.startButtonBreak');
let animationState = 'paused'; //Flag
let animationStateBreak = 'paused'; //Flag
let timerButtonsFlag = false;
    /* Count Down Numbers and Input interaction */
const minutes_indicatorNumber = document.querySelector('.minutes_indicatorNumber'); //h2
const countDownText = document.getElementById('countDownText');
const upNextText = document.getElementById('upNextText');
    //const timerForm = document.querySelector('.timerForm');
const focus_timerEdit = document.getElementById('focus_timerEdit'); //Button Focus
const break_timerEdit = document.getElementById('break_timerEdit'); //Button Break
    //Changing Variables -> For focus timer
var focusTimer_Value = 600; //600
var focusTimer_Value1 = null; //Keep an eye on here.
var focusTimer_Value2 = null;
var interval_of_time = null;
var timerFlag = false; //Flag
    //Changing Variables -> For break timer
var breakTimer_Value = 600; 
var breakTimer_Value1 = null;
var breakTimer_Value2 = null;
var interval_of_timeBreak = null;
var timerOnFlag_break = false;
    /* Buttons SVG (Pause and Start)
    const svg_startFocus = document.querySelector('.svg_startFocus');
    const svg_pauseFocus = document.querySelector('.svg_pauseFocus'); */
//Audio
const audio = document.getElementById('Alarm_Audio');
var final_tone_selection = 'audio/chiptune-alarm-clock-112869.mp3';
    /* Tones */
var tonePlaying = null;
var tone_visualization_reference = document.querySelector('.tone_visualization_reference');
var audioExample = document.getElementById('Alarm_AudioExample');
const radios = document.querySelectorAll('input[name="tones_options"]');
    /* Volume */
var volumeValue = null;
const slider = document.getElementById('slider');

/* ALL FUNCTIONS OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO*/
// Audio and Volume
    /* Examples */
radios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            /* console.log(this.id); */
            tonePlaying = this.id;
            alarm_audio_animationExample();

            if (tonePlaying == 'defaultTone'){
                /* tone_visualization_reference.style.animationDuration = '100s'; */
                audioExample.src = 'audio/chiptune-alarm-clock-112869.mp3';
                audioExample.currentTime = 0; 
                audioExample.play();

                /* console.log(final_tone_selection); */
                final_tone_selection = 'audio/chiptune-alarm-clock-112869.mp3';
                audio.src = final_tone_selection;
            }
            if (tonePlaying == 'toneTwo'){
                audioExample.src = 'audio/level-up-191997.mp3';
                audioExample.currentTime = 0; 
                audioExample.play();

                /* console.log(final_tone_selection); */
                final_tone_selection = 'audio/level-up-191997.mp3';
                audio.src = final_tone_selection;
            }
            if (tonePlaying == 'toneThree'){
                audioExample.src = 'audio/simple-notification-152054.mp3';
                audioExample.currentTime = 0; 
                audioExample.play();

                final_tone_selection = 'audio/simple-notification-152054.mp3';
                audio.src = final_tone_selection;
            }
            if (tonePlaying == 'toneFour'){
                audioExample.src = 'audio/button-124476.mp3';
                audioExample.currentTime = 0; 
                audioExample.play();

                final_tone_selection = 'audio/button-124476.mp3';
                audio.src = final_tone_selection;
            }
        }
    });
});
slider.addEventListener('input', function() {
    volumeValue = slider.valueAsNumber;
    volumeValue = volumeValue / 100;
    audioExample.volume = volumeValue;
    audio.volume = volumeValue;

});
function alarm_audio_animationExample(){
    tone_visualization_reference.style.animation = 'none';
    // Forzamos el reflujo para que el navegador aplique el cambio (Ayuda a crear cambios instantaneos)
    void tone_visualization_reference.offsetWidth; 
    tone_visualization_reference.style.animationName = 'jumpSound';
    tone_visualization_reference.style.animationDuration = '0.9s';
    tone_visualization_reference.style.animationPlayState = 'running';
}
    /* Real alarm */
function alarmSoundF(){ /* ESTE BOTÓN ES IMPROVISADO PARA DARME UNA IDEA DE COMO SERÁ ACTIVAR Y DEASCTIVAR, PUES ESTO SE 
    ACTIVARA AL FINAL DE LAS FUNCIONES Y  DESACTIVARA SEA CON EL BOTÓN E INICIO DE LA SIGUIENTES ALARMAS, ASEGURATE
    DE BORRAR ESTO UNA VEZ RESUELTO AMBOS TIMERS*/
    document.querySelector('.timerAlarm').style.visibility = 'visible';
    document.querySelector('.timerAlarm').style.animationName = 'alarmAnimation';
    document.querySelector('.timerAlarm').style.animationPlayState = 'running';
    /* audio = document.getElementById('Alarm_Audio'); */
    audio.currentTime = 0; // Reinicia el audio al inicio
    audio.play();
}
document.querySelector('.cancelAlarm_svg').addEventListener('click', cancelAlarmTimer);
function cancelAlarmTimer(){
    document.querySelector('.timerAlarm').style.visibility = 'hidden';
    document.querySelector('.timerAlarm').style.animationName = 'close_alarmAnimation';
    /* audio = document.getElementById('Alarm_Audio'); */
    audio.pause();
};
/* De esta manera puedo tanto usar la función desde un evento como otra función */
// Placeholder
document.querySelector('.distracting_notes_editable').addEventListener('click', function(){
    document.querySelector('.PlaceHolder_notes').style.visibility = 'hidden';
});
// Phone Users
document.getElementById('phones_NoteSVG').addEventListener('click', function(){
    document.querySelector('.phones_Note').style.display = 'none';
});
//Settings (Open and Close) 
document.getElementById('svg_settings').addEventListener("click", function () {
    section_two.style.visibility = 'visible';

    settings_section_one.style.visibility = 'visible';
    settings_section_two.style.visibility = 'hidden';
    settings_section_three.style.visibility = 'hidden';
    settings_section_four.style.visibility = 'hidden';

    settings_button_B1.style.backgroundColor = backgroundColor_var;
    settings_button_B2.style.backgroundColor = 'inherit';
    settings_button_B3.style.backgroundColor = 'inherit';
    settings_button_B4.style.backgroundColor = 'inherit';
});
function close_settings(){
    section_two.style.visibility = 'hidden';

    settings_section_one.style.visibility = 'hidden';
    settings_section_two.style.visibility = 'hidden';
    settings_section_three.style.visibility = 'hidden';
    settings_section_four.style.visibility = 'hidden';

    audioExample.pause();
}
//Settings (Visualization) 
function ajust_timers_visualization(){
    settings_section_one.style.visibility = 'visible';
    settings_section_two.style.visibility = 'hidden';
    settings_section_three.style.visibility = 'hidden';
    settings_section_four.style.visibility = 'hidden';
    
    settings_button_B1.style.backgroundColor = backgroundColor_var;
    settings_button_B2.style.backgroundColor = 'inherit';
    settings_button_B3.style.backgroundColor = 'inherit';
    settings_button_B4.style.backgroundColor = 'inherit';

    audioExample.pause();
}
function ajust_colors_visualization(){
    settings_section_one.style.visibility = 'hidden';
    settings_section_two.style.visibility = 'visible';
    settings_section_three.style.visibility = 'hidden';
    settings_section_four.style.visibility = 'hidden';

    settings_button_B1.style.backgroundColor = 'inherit';
    settings_button_B2.style.backgroundColor = backgroundColor_var;
    settings_button_B3.style.backgroundColor = 'inherit';
    settings_button_B4.style.backgroundColor = 'inherit';

    audioExample.pause();
}
function ajust_sounds_visualization(){
    settings_section_one.style.visibility = 'hidden';
    settings_section_two.style.visibility = 'hidden';
    settings_section_three.style.visibility = 'visible';
    settings_section_four.style.visibility = 'hidden';

    settings_button_B1.style.backgroundColor = 'inherit';
    settings_button_B2.style.backgroundColor = 'inherit';
    settings_button_B3.style.backgroundColor = backgroundColor_var;
    settings_button_B4.style.backgroundColor = 'inherit';
}
function ajust_extras_visualization(){
    settings_section_one.style.visibility = 'hidden';
    settings_section_two.style.visibility = 'hidden';
    settings_section_three.style.visibility = 'hidden';
    settings_section_four.style.visibility = 'visible';
    
    settings_button_B1.style.backgroundColor = 'inherit';
    settings_button_B2.style.backgroundColor = 'inherit';
    settings_button_B3.style.backgroundColor = 'inherit';
    settings_button_B4.style.backgroundColor = backgroundColor_var;

    audioExample.pause();
}
//Color Palettes (Functions)
function orange_ColorPalette(){
    root.style.setProperty('--principal_web_color', '#FD8900');
    root.style.setProperty('--second_web_color','#110D15');
    root.style.setProperty('--third_web_color','#3C3C3C');
    root.style.setProperty('--secondVariant_web_color','#201D23'); /* 8c8c8c */
    root.style.setProperty('--thirdVariant_web_color', '#6F6F6F');
    root.style.setProperty('--forBoxShadow_color', '#000000')

    backgroundColor_var = '#201D23';
    settings_button_B2.style.backgroundColor = backgroundColor_var;

    /* console.log('SV a...:', secondVariant_web_color); */
}
function default_ColorPalette(){
    root.style.setProperty('--principal_web_color', '#852BBC');
    root.style.setProperty('--second_web_color', '#151627');
    root.style.setProperty('--third_web_color', '#F2F3FF')
    root.style.setProperty('--secondVariant_web_color', '#1d1f35');
    root.style.setProperty('--thirdVariant_web_color', '#a3a3a3');
    root.style.setProperty('--forBoxShadow_color', 'black');

    backgroundColor_var = '#1d1f35';
    settings_button_B2.style.backgroundColor = backgroundColor_var;
}
function blue_ColorPalette(){
    root.style.setProperty('--principal_web_color', '#42FF00');
    root.style.setProperty('--second_web_color','#0C001B');
    root.style.setProperty('--third_web_color','#e7e7e7');
    root.style.setProperty('--secondVariant_web_color','#13002a'); /* 8c8c8c */
    root.style.setProperty('--thirdVariant_web_color', '#7b7b7b');
    root.style.setProperty('--forBoxShadow_color', 'black')

    backgroundColor_var = '#13002a';
    settings_button_B2.style.backgroundColor = backgroundColor_var;
}
function pastel_purple_ColorPalette(){
    root.style.setProperty('--principal_web_color', '#9263DF');
    root.style.setProperty('--second_web_color','#FFCFEF');
    root.style.setProperty('--third_web_color','#3C3C3C');
    root.style.setProperty('--secondVariant_web_color','#BDAFB8'); /* 8c8c8c */
    root.style.setProperty('--thirdVariant_web_color', '#2D2D2D');
    root.style.setProperty('--forBoxShadow_color', '#858585')

    backgroundColor_var = '#BDAFB8';
    settings_button_B2.style.backgroundColor = backgroundColor_var;
}

//Timer: Input
document.querySelector('.timerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    //FOCUS
    focusTimer_Value = focus_timerEdit.valueAsNumber * 60; 
    focusTimer_Value1 = focusTimer_Value.toString();
    focusTimer_Value2 = focusTimer_Value1 + 's';
    minutes_indicatorNumber.innerHTML = 'Ready?';
    //BREAK
    breakTimer_Value = break_timerEdit.valueAsNumber * 60; 
    breakTimer_Value1 = breakTimer_Value.toString();
    breakTimer_Value2 = breakTimer_Value1 + 's';

    
    timerFlag = true; 

});
//Buttons Visibility and Extra Details
function timerButtonsVisibility(){
    if(timerButtonsFlag == true){
        countDownText.innerHTML = 'Focus Time';
        upNextText.innerHTML = 'Up Next: ' + break_timerEdit.value +'min break';
        startButtonFocus.style.visibility = 'visible';
        startButtonBreak.style.visibility = 'hidden';
        minutes_indicatorNumber.style.color = third_web_color;    
    }
    else{
        countDownText.innerHTML = 'Break Time';
        upNextText.innerHTML = 'Up Next: ' + focus_timerEdit.value +'min focus';
        startButtonFocus.style.visibility = 'hidden';
        startButtonBreak.style.visibility = 'visible';
        minutes_indicatorNumber.style.color = third_web_color;
    }
}
//Timer: Start, Pause, Restart Animation (Focus)
function timer_circle_indicator_Animation(){
    cancelAlarmTimer();
    if (animationState === 'paused'){
        interval_of_time = setInterval(updateCountdown, 1000);
        timer_circle_indicator.style.animationName = 'rotate';
        timer_circle_indicator.style.animationDuration = focusTimer_Value2;
        timer_circle_indicator.style.animationPlayState = 'running';
        animationState = 'running'; //Flag
        minutes_indicatorNumber.style.color = principal_web_color;
    }
    else{
        clearInterval(interval_of_time);
        timer_circle_indicator.style.animationPlayState = 'paused';
        animationState = 'paused'; //Flag
        minutes_indicatorNumber.style.color = third_web_color;
        }
}
function updateCountdown(){
    const minutes = Math.floor(focusTimer_Value / 60); 
    let seconds = focusTimer_Value % 60; 
        
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        
    minutes_indicatorNumber.innerHTML = `${formattedMinutes} : ${formattedSeconds}`;
    focusTimer_Value--; 
    
    if (focusTimer_Value < 0) {
        clearInterval(interval_of_time);
        timerButtonsFlag = false;
        timerButtonsVisibility()
        breakTimer_Value = 600; 
        if(timerFlag == true){
            breakTimer_Value = break_timerEdit.valueAsNumber * 60; 
        }
        alarmSoundF();

    } 
}
//Timer: Start, Pause, Restart Animation (Break)
function timer_circle_indicator_Animation2(){
    cancelAlarmTimer();
    if (animationStateBreak === 'paused'){
        interval_of_timeBreak = setInterval(updateCountdown2, 1000);
        timer_circle_indicator.style.animationName = 'rotate2';
        timer_circle_indicator.style.animationDuration = breakTimer_Value2;
        timer_circle_indicator.style.animationPlayState = 'running';
        animationStateBreak = 'running'; //Flag
        minutes_indicatorNumber.style.color = principal_web_color; 
    }
    else{
        clearInterval(interval_of_timeBreak);
        timer_circle_indicator.style.animationPlayState = 'paused';
        animationStateBreak = 'paused'; //Flag
        minutes_indicatorNumber.style.color = third_web_color; 
        }
}
function updateCountdown2(){
    const minutes2 = Math.floor(breakTimer_Value / 60); 
    let seconds2 = breakTimer_Value % 60; 

    const formattedMinutes2 = minutes2 < 10 ? `0${minutes2}` : minutes2;
    const formattedSeconds2 = seconds2 < 10 ? `0${seconds2}` : seconds2;
        
    minutes_indicatorNumber.innerHTML = `${formattedMinutes2} : ${formattedSeconds2}`;
    breakTimer_Value--; 
    
    if (breakTimer_Value < 0) {
        clearInterval(interval_of_timeBreak);
        timerButtonsFlag = true;
        timerButtonsVisibility();
        focusTimer_Value = 600; 
        if(timerFlag == true){
            focusTimer_Value = focus_timerEdit.valueAsNumber * 60; 
        }
        alarmSoundF();
    } 
} 


/* TAREAS
 Asegurate de entender el reinicio de la animación
 Crea la función que varie el volumen
 Crea las funciones de submit que realmente apliquen los cambios

 Extra: Considera cambiar el tiempo de duración de la animación para el default tone.
 2do Extra: Considera cambiar el estilo de los inputs (tanto range como radio)

*/

/* Lo que he hecho
Busque la tarea principal
Acomodar las variables y funciones en orden
Cree la función de variar volumen
Cree la primera opción submit y depués decidi no usar submits, sino incluirlos a la prueba
Es mejor dejar el audio largo
*/