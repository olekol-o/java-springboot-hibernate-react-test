import {action, observable, reaction} from "mobx"
import Home from "../components/pages/Home"
import Shopping from "../components/pages/Shopping"
import SignIn from "../components/pages/SignIn"
import SignUp from "../components/pages/SignUp"
import userStore from './UserStore'

class RouterStore {

    // список моделей роутов для гостя
    private anonymousRoutes: Array<object> = [
        { path: '/', name: 'Home', Component: Home },
        { path: '/shopping', name: 'Shopping', Component: Shopping },
        { path: '/signin', name: 'Sign in', Component: SignIn },
        { path: '/signup', name: 'Register', Component: SignUp }
    ]

    // список моделей роутов для аунтентифицированного пользователя
    private loggedRoutes: Array<object> = [
        { path: '/', name: 'Home', Component: Home },
        { path: '/shopping', name: 'Shopping', Component: Shopping },
        { path: '/auth:out', name: 'Sign out', Component: Home }
    ]

    // наблюдаемый текущий список роутов
    // (по умолчнию - для гостя)
    @observable routes: Array<object> = this.anonymousRoutes

    // установить в качестве текущего список роутов для гостя
    @action setAnonymousRoutes() {
        this.routes = this.anonymousRoutes
    }

    // установить в качестве текущего список роутов для аунтентифицированного пользователя
    @action setLoggedRoutes() {
        this.routes = this.loggedRoutes
    }

    // реакция на изменение значения наблюдаемого свойства userStore.user:
    // если userStore.user установлен,
    // в текущем списке моделей роутов ищем
    // модель, в свойстве name которой содержится подстрока 'Sign out'
    userReaction = reaction(
        () => userStore.user,
        (user) => {
            if (user) {
                const signOutRoute =
                    this.loggedRoutes
                        .find(route => route['name'].includes('Sign out'))
                // в модель роута "Выход" в свойство name
                // записываем текст: Sign out + ИМЯ_ПОЛЬЗОВАТЕЛЯ,
                // где ИМЯ_ПОЛЬЗОВАТЕЛЯ узнаем из наблюдаемого свойства userStore.user
                signOutRoute['name'] = `Sign out (${userStore.user.name})`
            }
        }
    )
}

export default new RouterStore()