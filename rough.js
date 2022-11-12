function readId(id){
    con.query (`select*from student where id=${id}`,(err,data)=>{
        if (err) throw err;
        console.log(data);
    })
}
let id=input.questionInt('Enter your ID Number => ');
readId(id)
setTimeout(()=>{
    console.log(`\nPress 1. For Update name\nPress 2. For Update age\nPress 3. For Update gmail-ID\nPress 4. For Update all Data\nPress 5. For break\n`);
    let choice=input.questionInt('enter your choice => ')
    if(choice ===1){
        let name=input.question('Enter you new Name => ');
        con.query(`update student set name='${name}' where id='${id}'`,(err,data)=>{
            if(err) throw err;
            console.log('your data updated done');
        })
    }
},100)
