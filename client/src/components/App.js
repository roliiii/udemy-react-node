import { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../actions'
import Header from './Header'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(actions.fetchUser())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ( 
        <div className='container'>
            <BrowserRouter>
                <>
                    <Header/>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/surveys" exact component={Dashboard}/>
                    <Route path="/surveys/new" component={SurveyNew}/>
                </>
            </BrowserRouter>
        </div>
    )
}

export default App;