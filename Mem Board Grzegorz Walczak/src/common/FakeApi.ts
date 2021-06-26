import {ACCESS_TOKEN, FAKE_LOGIN, TEST_LOGIN, TEST_PASSWORD, TEST_TOKEN_VALUE} from "./Constants";
import {LoginAndPass} from "../pages/login/LoginPage";
import {MemCardInformation} from "../pages/mems/MemsPage";
import {v4 as uuidv4} from "uuid";
import {img1, img2, img5, img6} from "./ImageConst";


export interface RequestOpt {
    url: string;
    method: string;
    body?: string;
}

export interface LoginAndPassResp {
    accessToken: string;
}

export interface UserResp {

}


export function getCurrentUser(): Promise<UserResp> {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    let item = localStorage.getItem(FAKE_LOGIN);
    if (item) {
        return new Promise<UserResp>((resolve, reject) => {
            setTimeout(() => {
                resolve({});
            }, 1000);
        });
    }
    return Promise.reject("No user");
}

export function login(loginAndPass: LoginAndPass): Promise<LoginAndPassResp> {
    if (loginAndPass.username === TEST_LOGIN && loginAndPass.password === TEST_PASSWORD) {
        return new Promise<LoginAndPassResp>((resolve, reject) => {
            setTimeout(() => {
                localStorage.setItem(FAKE_LOGIN, 'true');
                resolve({accessToken: TEST_TOKEN_VALUE});
            }, 300);
        });
    }

    return Promise.reject("Błędny login lub hasło.")
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(FAKE_LOGIN)
}

export namespace Api {

    export function init() {
        if (!sessionStorage.getItem('initFlag')) {
            sessionStorage.setItem('initFlag', 'true');
            pushMem("Bill Gates", "Hehe", img1, ["Haahahhaha dobry Bill"]);
            pushMem("Kot", ":D", img2, ["Jaki słodki, miły kotek", "Koty są fajne"]);
            pushMem("Pudzian", "", img5, []);
            pushMem("Sylwester z jedynką", "", img6, ["Lepszy jest z polsatem!!!"]);
        }
    }

    function pushMem(nazwa: string, podpis: string, imgbase64: string, kom: string[]) {
        const mem: MemCardInformation = {
            id: uuidv4(),
            nazwa: nazwa,
            data: createNowDate(),
            podpis: podpis,
            base64: "data:image/png;base64," + imgbase64,
            komentarze: kom
        };
        addNewMem(mem);
    }

    export function addNewMem(mem: MemCardInformation) {
        let item = sessionStorage.getItem('memes');
        if (item) {
            let memesFromStorage: MemCardInformation[] = JSON.parse(item);
            memesFromStorage.push(mem);
            sessionStorage.setItem('memes', JSON.stringify(memesFromStorage))
        } else {
            sessionStorage.setItem('memes', JSON.stringify([mem]))
        }
    }

    export function getAllMems(): MemCardInformation[] {
        let item = sessionStorage.getItem('memes');
        return item ? JSON.parse(item) : [];
    }

    export function deleteMemById(memId: string) {
        let item = sessionStorage.getItem('memes');
        if (item) {
            let memesFromStorage: MemCardInformation[] = JSON.parse(item);
            let mems = memesFromStorage.filter(value => value.id !== memId);
            sessionStorage.setItem('memes', JSON.stringify(mems))
        }
    }

    export function addNewComment(memId: string, text: string) {
        console.log(memId);
        let item = sessionStorage.getItem('memes');
        if (item) {
            let memesFromStorage: MemCardInformation[] = JSON.parse(item);
            let mem = memesFromStorage.find(value => value.id === memId);
            if (mem) {
                mem.komentarze.push(text);
                let index = memesFromStorage.findIndex(value => value.id === memId);
                memesFromStorage[index] = mem;
                sessionStorage.setItem('memes', JSON.stringify(memesFromStorage))
            }
        }
    }


}

export function createNowDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return mm + '-' + dd + '-' + yyyy + "  " + today.getHours() + ":" + today.getMinutes();
}
