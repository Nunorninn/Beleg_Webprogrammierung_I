
function Updateprogress(Index)
{
    const bar = document.getElementById("progress-bar");

    const percentage = (Index / 10 ) * 100;

    bar.style.width = percentage + "%";

    if (Index >= 8) {
        bar.style.backgroundColor = "#00FF00";
    }
    else if (5 <= Index && Index < 8){
        bar.style.backgroundColor = "#9ACD32";
    }
    else if (3 <= Index && Index < 5){
        bar.style.backgroundColor = "#ffc400";
    }
    else if (1 <= Index && Index < 3){
        bar.style.backgroundColor = "#8B0000";
    }
}
