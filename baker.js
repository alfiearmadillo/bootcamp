let baker ={
    isSick:0,
    cakesBaked:0,
    name:"Bakernald"
};

function bakeAfterSeconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            let tempRandom = Math.floor(Math.random() * 5)
            if(tempRandom===0){
                resolve(1) ;
            } else {
                resolve(0);
            }
        }, 4000);
    });
}

function bakeCakes(sick) {
    if(sick===0){
        baker.cakesBaked=Math.floor(Math.random() * 5)+1;
    }
}

bakeAfterSeconds().then(function(success){
    baker.isSick=success;
    bakeCakes(baker.isSick);
})
.finally(()=>{
    if(baker.isSick===1){
        console.log("Baker is sick.")
    }
    if(baker.cakesBaked!==1){
        console.log(`Having party with ${baker.cakesBaked} cakes.`);
    } else {
        console.log(`Having party with ${baker.cakesBaked} cake.`);
    }
})