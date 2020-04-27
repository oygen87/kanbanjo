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

const provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');

export const loginWithGitHub = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;

        const uid = firebase.auth().currentUser.uid;
        const detailsRef = firebase.database().ref("users/" + uid + "/details");
        detailsRef.set({
            photo: user.photoURL,
            email: user.email,
            name: user.displayName
        });
        return user;
    }).catch((error) => {
        console.log(error);
    });

};
export const loginWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider).then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;

        const uid = firebase.auth().currentUser.uid;
        const detailsRef = firebase.database().ref("users/" + uid + "/details");
        detailsRef.set({
            photo: user.photoURL,
            email: user.email,
            name: user.displayName
        });
        return user;
    }).catch((error) => {
        // handle error
    });
};

export const logoutFromGitHub = () => {
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
        const tasksRef = await firebase.database().ref("users/" + uid + "/tasks");
        tasksRef.set({
            first: task,
        });
    } else {
        const tasksRef = await firebase.database().ref("users/" + uid + "/tasks").push(task);
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
