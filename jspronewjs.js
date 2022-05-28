const form=document.querySelector('#form');
const search=document.querySelector('#searchbox');
const result=document.querySelector('#result');

const apiUrl='https://api.lyrics.ovh';

form.addEventListener('submit',e=>{
    e.preventDefault();
    searchValue=search.value.trim();

    if(!searchValue){
        alert('Type something to search');
    }
    else{
        searchSong(searchValue);
    }
    
})
async function searchSong(searchValue){
   
    const searchResult=await fetch(`${apiUrl}/suggest/${searchValue}`)
    const data=await searchResult.json();
    showData(data);
   
   
   
}



function showData(data){
      result.innerHTML=`
<ul class="song-list"> 
${data.data.map(song=>`<li>
                         <div>
                         <strong>
                         ${song.artist.name}
                         </strong>-${song.title}
                         </div>
                         <span data-artist=" ${song.artist.name}" data-songtitle="${song.title}">
                         get Lyrics
                         </span>
                         </li>
                         
                         `).join('')
                        }
                        </ul>`
    
    

}

result.addEventListener('click',e=>{
    const clickedElement=e.target;
    
    if(clickedElement.tagName==="SPAN"){
        const artist=clickedElement.getAttribute('data-artist');
        const songTitle=clickedElement.getAttribute('data-songtitle');
        try{
            getLyrics(artist, songTitle);
        }
        catch(err){
alert("lyrics are not found for this song :( ")
        }
        
      
    }
})

async function getLyrics(artist,songTitle){
    try{
    const res=await fetch(`${apiUrl}/v1/${artist}/${songTitle}`)
    const data=await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
    result.innerHTML=`<h2>
                      <strong>
                       ${artist}</strong>-${songTitle}
                       </h2>
                       <p>${lyrics}</p>
    `}
    catch(err){
        alert("lyrics not found :(")
    }

}