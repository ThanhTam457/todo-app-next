export default function db () {
    const keys = {
        user: [
            {name: 'name', unique: false},
            {name: 'email', unique: false},
            {name: 'password', unique: false}
        ],
        task: [
            {name: 'name', unique: false},
            {name: 'userId', unique: false},
        ]
    };
    
    let db : IDBDatabase;
    const openDatabase = () =>{
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open('data',3);
            request.onerror = (err) => {
                console.error('IndexedDB error: ${request.error}',err);
                reject(err);
            };
            request.onsuccess = () => {
                db = request.result;
                resolve(db);
            };

            request.onupgradeneeded = () =>{
                db = request.result;
                let usersStore = db.createObjectStore('users', {keyPath: 'id', autoIncrement: true}); 
                let tasksStore = db.createObjectStore('tasks', {keyPath:'id', autoIncrement: true});
                keys.user.forEach((key) => usersStore.createIndex(key.name, [key.name], {unique: key.unique}));
                keys.task.forEach((key) => tasksStore.createIndex(key.name, [key.name], {unique: key.unique}));
            };

        })
    };

    async function initialDatabase(){
        try{
            db = await openDatabase() as IDBDatabase;
            return db;
        } catch (error) {
            console.log(error);     
        }
    }
    return initialDatabase();
}