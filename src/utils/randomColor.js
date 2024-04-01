
const colors = {
    0:"bg-violet-500 text-white",
    1:"bg-yellow-400 text-white",
    2:"bg-zinc-400 text-white",
    3:"bg-lime-500 text-white"
}

function randomColor(){
    let choice = Math.floor(Math.random() * 4);
    return colors[choice];
}

export { randomColor };