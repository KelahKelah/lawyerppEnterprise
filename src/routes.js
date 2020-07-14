import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/navigation/navigation";
import Home from "./pages/home/home";
import Court from "./pages/court/court";
import ViewCourt from "./pages/court/viewCourt";
import CourtFile from "./pages/court/courtFiles";
import FillFileProcesses from "./pages/file_process/FillFileProcesses";
import ViewFileProcesses from "./pages/file_process/ViewFileProcesses";
import Payment from "./pages/payment/payment";
import Login from "./pages/login/login";
import LawyerCases from "./pages/court/allLawyerCases";
import Lawfirms from "./pages/court/lawfirms";
import CourtsForJudge from "./pages/court/courtsForJudge";
import JudgeCase from "./pages/court/allJudgeCases";
import CreateOrgainization from "./pages/court/createOrganization";
import ViewOrganiztions from './pages/court/viewOrganiztions'
import Error from "./components/error/error";

const MainRoute = ({ Component, path, exact, purpose, auth, ...rest }) => {
  var [unauthorized, setUnauthorized] = useState(false);
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(props) =>
        localStorage.getItem("userData") && !unauthorized ? (
          <div>
            <Navigation />
            <Component {...rest} {...props} setUnauthorized={setUnauthorized} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <MainRoute exact path="/home" Component={Home} />
          <MainRoute exact path="/create/Court" Component={Court} />
          <MainRoute exact path="/courts" Component={ViewCourt} />
          <MainRoute exact path="/lawfirms" Component={Lawfirms} />
          <MainRoute exact path="/lawfirms/:id" Component={LawyerCases} />
          <MainRoute exact path="/court" Component={CourtFile} />
          <MainRoute exact path="/process/fill" Component={FillFileProcesses} />
          <MainRoute exact path="/process/view" Component={ViewFileProcesses} />
          <MainRoute exact path="/process/pay" Component={Payment} />
          <MainRoute exact path="/assign/lawyer" Component={CourtsForJudge} />
          <MainRoute exact path="/assign/lawyer/:id" Component={JudgeCase} />
          <MainRoute
            exact
            path="/create/organization"
            Component={CreateOrgainization}
          />
          <MainRoute
            exact
            path="/view/organization"
            Component={ViewOrganiztions}
          />
          <MainRoute exact path="*" Component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default Routes;
