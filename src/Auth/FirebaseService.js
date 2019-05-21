import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDbxijYfEwFpxbc9ABNkuzekanWtSr0_FI",
    authDomain: "eugen-login-c5b84.firebaseapp.com",
    databaseURL: "https://eugen-login-c5b84.firebaseio.com",
    projectId: "eugen-login-c5b84",
    storageBucket: "eugen-login-c5b84.appspot.com",
    messagingSenderId: "562761796882",
    appId: "1:562761796882:web:d9c12e0ed500d5c8"
};

firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');

export const loginWithGitHub = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        //console.log(result);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //console.log(token);
        //console.log(user);

        const uid = firebase.auth().currentUser.uid;
        var detailsRef = firebase.database().ref("users/" + uid + "/details");
        detailsRef.set({
            photo: user.photoURL,
            email: user.email,
            name: user.displayName
        });
        // ...
        return user;
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

   /*
    return firebase.auth().getRedirectResult().then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        console.log(result);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //console.log(token);
        //console.log(user);

        const uid = firebase.auth().currentUser.uid;
        var detailsRef = firebase.database().ref("users/" + uid + "/details");
        detailsRef.set({
            photo: user.photoURL,
            email: user.email,
            name: user.displayName
        });
        // ...
        return user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });*/
};
export const loginWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider).then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        //console.log(result);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //console.log(token);
        //console.log(user);

        const uid = firebase.auth().currentUser.uid;
        var detailsRef = firebase.database().ref("users/" + uid + "/details");
        detailsRef.set({
            photo: user.photoURL,
            email: user.email,
            name: user.displayName
        });
        // ...
        return user;
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
};

/*export const loginWithRedirect = () => {
    return firebase.auth().getRedirectResult().then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        //console.log(result);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token);
        console.log(user);

        const uid = firebase.auth().currentUser.uid;
        var detailsRef = firebase.database().ref("users/" + uid + "/details");
        detailsRef.set({
            photo: user.photoURL,
            email: user.email,
            name: user.displayName
        });
        // ...
        return user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}*/

export const logoutFromGitHub = () => {
    //console.log("TRYING TO LOGOUT");
    return firebase.auth().signOut()
        .then(() => {
            console.log('Signout Succesful')
        }).catch((error) => {
            console.log('Signout Failed' + error)
        });
};

export const readProfile = async (props) => {
    if (!isLoggedIn()) {
            props.history.push('/');
            return;
    }
    const uid = firebase.auth().currentUser.uid;

    return firebase.database().ref('users/' + uid + "/details")
        .once('value')
        .then(snapshot => {
            return snapshot.val();
        });
};

export const fetchTasks = async (props) => {
    if (!isLoggedIn()) {
        props.history.push('/');
        return;
    }
    const uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('users/' + uid + "/tasks")
        .once('value')
        .then(snapshot => {
            return transformTasks(snapshot.val());
        });
};

export const isLoggedIn = () => {
    return !!firebase.auth().currentUser;
};

export const currentUser = () => {
    return firebase.auth().currentUser;
};

export const createNewTask = async (task) => {
    const uid = firebase.auth().currentUser.uid;

    const tasks = await firebase.database().ref('users/' + uid + "/tasks")
        .once('value')
        .then(snapshot => {
            return snapshot.val();
        });

    if (tasks === null) {
        var tasksRef = await firebase.database().ref("users/" + uid + "/tasks");
        tasksRef.set({
            first: task,
        });
    } else {
        var tasksRef = await firebase.database().ref("users/" + uid + "/tasks").push(task);
    }
};

export const removeTask = async (key) => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + uid + "/tasks").child(key).remove();
};

export const updateTask = async (task) => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + uid + "/tasks").child(task.id).update(task);
};

export const isRedirected = async () => {
    await firebase.auth().getRedirectResult();
};


const transformTasks = (allTasks) => {
    if (!allTasks) {
        return null;
    }
    return Object.keys(allTasks).map(key => {
        return {...allTasks[key], id: key};
    });
};