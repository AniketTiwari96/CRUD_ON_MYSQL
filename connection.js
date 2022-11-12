
const mysql=require('mysql');
const input=require('readline-sync');
// connection of database
let con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Aniket@123',
    database:'crudData'
});


con.connect((err)=>{
    if (err) throw err;
    console.log('database connected ;');
    var sql = "CREATE TABLE student (id int AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), age int,gmail varchar(55))";
    con.query(sql, function (err, result) {
        if(err){
            console.log('table already exist ');
        }else{
            console.log("Table created");
        }
    })
})

setTimeout(()=>{
    let create=()=>{
        let name=input.question('Enter your Name => ')
        let age=input.questionInt('Enter your Age => ');
        let gmail=input.question('Enter your G-mail ID => ')
        con.query(`insert into student (name,age,gmail) 
            values ("${name}","${age}","${gmail}")`,(err)=> {
            if (err) throw err;
            console.log("Student data insert successfuly......")
            c()
       })
    }
    let read=()=>{
        console.log(`Press 1. For read id data\nPress 2. For read all data\n`);
        let choice=input.questionInt('enter your choice =>')
        if(choice === 1){
            let id=input.questionInt('Enter your ID Number => ');
            con.query(`select*from student where id=${id}`,(err,data)=>{
                if (err) throw err;
                else{
                    if(data.length>0){
                        console.log(data);
                        c()
                    }else{
                        console.log('your id dose not exist');
                        c()
                    }
                }
            })
        }else if (choice === 2 ){
            con.query(`select*from student`,(err,data)=>{
                if (err) throw err;
                else{
                    if(data.length>0){
                        console.log(data);
                        c()
                    }else{
                        console.log('your data dose not exist ;');
                        c()
                    }
                }
            })
        }
    };
    let update= ()=>{
        let id=input.questionInt('Which ID you want to Update\nEnter your ID Number => ');
        con.query (`select*from student where id=${id}`,(err,data)=>{
            if (err) throw err;
            console.log(data);
            console.log(`\nPress 1. For Update name\nPress 2. For Update age\nPress 3. For Update gmail-ID\nPress 4. For Update all Data\nPress 5. For Break\n`);
            let choice=input.questionInt('enter your choice => ')
            if(choice === 1){
                let name=input.question('Enter you new Name => ');
                con.query(`update student set name='${name}' where id='${id}'`,(err,data)=>{
                    if(err) throw err;
                    console.log('Your Name has been updated  successfully....');
                    c()

                })
            }else if(choice === 2){
                let age=input.questionInt('Enter you new Age => ');
                con.query(`update student set Age='${age}' where id='${id}'`,(err,data)=>{
                    if(err) throw err;
                    console.log('Your Age has been updated  successfully....');
                    c()
                })
            }else if( choice === 3 ){
                let Gmail=input.question('Enter you new Gmail-ID => ');
                con.query(`update student set Gmail='${Gmail}' where id='${id}'`,(err,data)=>{
                    if(err) throw err;
                    console.log('Your Name has been updated successfully....');
                    c()
                })
            }else if(choice === 4 ){
                let name=input.question('Enter you new Name => ');
                let age=input.questionInt('Enter you new Age => ');
                let gmail=input.question('Enter you new Gmail-ID => ');
                con.query(`update student set name='${name}' , age="${age}", gmail='${gmail}'  where id="${id}"`,(err,data)=>{
                    if(err) throw err;
                    console.log('Your all data has been updated successfully....');
                    c()
                })
            }else if(choice === 5){
                console.log('your program is stoped ;');
                process.exit()
            }
        })
    }
    let delete1=()=>{
        console.log(`Press 1. For Delete id data\nPress 2. For Delete all data\n`);
        let choice = input.questionInt('Enter your Choice => ');
        if(choice === 1){
            let id=input.questionInt('which ID you want to Delete\nEnter your ID-Number => ')
            con.query(`select*from student where id=${id}`,(err,data)=>{
                if(err) throw err;
                console.log('This is your id data',data);
                const confirm = input.question("Are your sure to Delete your account ? Press y or n :- ");
                if(confirm=='y'){
                    con.query(`delete from student where id=${id}`,(err,data)=>{
                        if(err) throw err;
                        console.log('Your account has been Deleted  successfully....');
                        c()
                    })
                }
            })
        }else if(choice === 2){
            const confirm = input.question("Are your sure to Delete your account ? press y or n :- ");
            if(confirm=='y'){
                con.query(`truncate table student`,(err,data)=>{
                    if(err) throw err;
                    console.log('your data deleted ;');
                    c();
                })
            }
        }
    }
    function c(){
        console.log('\nPress 1. For Create\nPress 2. For Read\nPress 3. For Update\nPress 4. For Delete\nPress 5. For break\n');
        let Choice=input.questionInt('enter your choice => ');
        if( Choice === 1 ){
            create();
        }else if(Choice===2){
            read();
        }else if(Choice===3){
            update()
        }else if(Choice===4){
            delete1()
        }else if(Choice===5){
            console.log('your program is stoped ;');
            process.exit();
        }
    }
    c();
},100)

