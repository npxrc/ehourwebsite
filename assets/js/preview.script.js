document.querySelector('.home').style.display="none"

const resizableDiv = document.getElementById('resizableDiv');
const resizeHandle = document.getElementById('resizeHandle');

let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
});

function handleMouseMove(e) {
    if (!isResizing) return;

    let newWidth = e.clientX - resizableDiv.getBoundingClientRect().left;
    let newHeight = e.clientY - resizableDiv.getBoundingClientRect().top;

    newHeight<420?newHeight=420:newHeight=newHeight;
    newHeight>window.innerHeight-50?newHeight=window.innerHeight-50:newHeight=newHeight;
    newWidth<569?newWidth=569:newWidth=newWidth;
    newWidth>window.innerWidth-50?newWidth=window.innerWidth-50:newWidth=newWidth;

    resizableDiv.style.width = `${newWidth}px`;
    resizableDiv.style.height = `${newHeight}px`;
}

function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

function handleWindowResize() {
    const maxWidth = window.innerWidth - 50;
    const maxHeight = window.innerHeight - 50;

    let currentWidth = resizableDiv.offsetWidth;
    let currentHeight = resizableDiv.offsetHeight;

    if (currentWidth <=569){
        //do nothing
    } else if (currentWidth > maxWidth) {
        resizableDiv.style.width = `${maxWidth}px`;
    }

    if (currentHeight <= 420){
        //do nothing
    } else if (currentHeight > maxHeight) {
        resizableDiv.style.height = `${maxHeight}px`;
    }
}

window.addEventListener('resize', handleWindowResize);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode, don't change
} else{
    document.documentElement.classList.toggle('ColorThemeLight');
    document.documentElement.classList.toggle('ColorThemeDark');
    document.body.classList.toggle('ColorThemeLight');
    document.body.classList.toggle('ColorThemeDark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";

    if (newColorScheme == "dark"){
        document.documentElement.classList.remove("ColorThemeLight");
        document.documentElement.classList.add("ColorThemeDark");
        document.body.classList.remove("ColorThemeLight");
        document.body.classList.add("ColorThemeDark");
    } else{
        document.documentElement.classList.remove("ColorThemeDark");
        document.documentElement.classList.add("ColorThemeLight");
        document.body.classList.remove("ColorThemeDark");
        document.body.classList.add("ColorThemeLight");
    }
});

function goBack(){
    history.pushState({}, "", location.href);
    location.replace('../')
}
function resizeToFit(){
    let currentWidth = resizableDiv.offsetWidth;
    let currentHeight = resizableDiv.offsetHeight;
    let maxWidth = window.innerWidth - 75;
    let maxHeight = window.innerHeight - 75;

    if (currentWidth >= maxWidth && currentHeight >= maxHeight){
        resizableDiv.style.height = `420px`;
        resizableDiv.style.width = `569px`;
    } else{
        resizableDiv.style.height = `${window.innerHeight-50}px`;
        resizableDiv.style.width = `${window.innerWidth-50}px`;
    }
}

let academies = [
    "Animal Health",
    "BioMedical Engineering",
    "Business Finance",
    "Civic Leadership",
    "Computer Science",
    "Design",
    "Distinguished Scholars",
    "e-Communication",
    "Engineering",
    "Future Educators",
    "Geoscience",
    "Green Tech",
    "Medical Professions",
    "Public Safety",
    "Sports Medicine & Exercise Science"
]

let requests = [
    //this is a JOKE list of FAKE activities that one would do for eHours in the Olathe District.
    //one should NOT attempt to do any of these (except donating to charity or
    //switching from Spotify to Apple Music)

    //I AM NOT LIABLE FOR STUPIDITY
    "Hacking into the CIA",
    "Breaking past the Windows Firewall",
    "Committing Arson against the Pentagon",
    "Committing Armed Robbery",
    "Meeting Tim Apple",
    "Breaking and Entering into an Animal Shelter",
    "Donating $20.000,00 to FeedingAmerica",
    "Pirating an NFT of a Literal Brick",
    "Building a car with a Turret on it",
    "Switching from Spotify to Apple Music",
    "Travelling to Jeffrey Epstein's Island",
    "Travelling to DC for Scholar's Bowl",
    "Teaching Children to Steal from the Rich"
]
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
function login(){
    document.querySelector('.login').style.display="none"
    document.querySelector('.home').style.display="flex"
    document.querySelector('#username').innerHTML=document.querySelector('#usernameInput').value;
    document.querySelector('#topbar .left').innerHTML="HourSync Preview - Home"

    
    document.querySelector('#academy').innerHTML=(academies[Math.floor(Math.random()*academies.length)])+" Academy";
    let randomAmtOfReqs = Math.floor(Math.random()*requests.length);
    let stillPending = Math.floor(Math.random()*5);
    shuffle(requests);
    let pendingHours = 0;
    let acceptedHours = 0;
    for (let i=0; i<randomAmtOfReqs; i++){
        let button = document.createElement('button');
        let eHoursReqd = 5+Math.floor(Math.random()*30)
        if (i<=stillPending) pendingHours+=eHoursReqd;
        else acceptedHours+=eHoursReqd;
        if (i<=stillPending) button.innerText=`Pending - ${requests[i]}\n${eHoursReqd} eHours`;
        else button.innerText=`${requests[i]}\n${eHoursReqd} eHours`;
        button.style.padding="10px 20px;"
        button.style.height="45px"
        button.onclick = ()=>alert('this is only a preview, let me at least finish the actual app first')
        document.querySelector('#homeRequests').appendChild(button);
        document.querySelector('#homeRequests').appendChild(document.createElement('br'));
    }
    document.querySelector('#returnedHours').innerText=0
    document.querySelector('#pendingHours').innerText=pendingHours
    document.querySelector('#acceptedHours').innerText=acceptedHours
    document.querySelector('#deniedHours').innerText=0

    document.querySelector('#homeRequests').appendChild(document.createElement('br'));
    document.querySelector('#homeRequests').appendChild(document.createElement('br'));
    document.querySelector('#homeRequests').appendChild(document.createElement('br'));
    
}