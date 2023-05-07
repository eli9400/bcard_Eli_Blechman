import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES, { SANDBOX_ROUTES } from "./routesModel";
import CardsPage from "../cards/pages/CardsPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import SignupPage from "../users/pages/SignupPage";
import LoginPage from "../users/pages/LoginPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import CardEditPage from "../cards/pages/CardEditPage";
import SandboxMenu from "../sandbox/pages/SandboxMenu";
import StaylesMenu from "../sandbox/pages/StaylesMenu";
import ComponentMenu from "../sandbox/pages/ComponentMenu";
import StyleModule from "../sandbox/components/styles/StyleModule";
import Styles from "../sandbox/components/styles/Styles";
import Template from "../sandbox/components/Template";
import Logic from "../sandbox/components/Logic";
import SandboxComponents from "../sandbox/components/SandboxComponents";
import StringInterpolation from "../sandbox/components/StringInterpolation";
import Babel from "../sandbox/introduction/Babel";
import EventsMenu from "../sandbox/pages/EventsMenu";
import OnClick from "../sandbox/events/OnClick";
import RaisingEvents from "../sandbox/events/RaisingEvents";
import ConditionalRendering from "../sandbox/conditional-rendering/ConditionalRendering";
import Loops from "../sandbox/iterations/Loops";
import MuiSandboxMenu from "../sandbox/pages/MuiSandboxMenu";
import DatatDisplayMenu from "../sandbox/pages/DatatDisplayMenu";
import LayotMenu from "../sandbox/pages/LayotMenu";
import NavigationMenu from "../sandbox/pages/NavigationMenu";
import MuiButton from "../sandbox/mui-sandbox/data-display/MuiButton";
import MuiDivider from "../sandbox/mui-sandbox/data-display/MuiDivider";
import MuiTypography from "../sandbox/mui-sandbox/data-display/MuiTypography";
import MuiBox from "../sandbox/mui-sandbox/layout/MuiBox";
import MuiContainer from "../sandbox/mui-sandbox/layout/MuiContainer";
import MuiGrid from "../sandbox/mui-sandbox/layout/MuiGrid";
import MuiStack from "../sandbox/mui-sandbox/layout/MuiStack";
import MuiAppBar from "../sandbox/mui-sandbox/navigations/MuiAppBar";
import MuiBottomNavigation from "../sandbox/mui-sandbox/navigations/MuiBottomNavigation";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<CardsPage />} />
      <Route path={ROUTES.CARDS} element={<CardsPage />} />
      <Route path={`${ROUTES.CARD_EDIT}/:cardId`} element={<CardEditPage />} />
      <Route
        path={`${ROUTES.CARD_DETAILS}/:cardId`}
        element={<CardDetailsPage />}
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path={ROUTES.SANDBOX} element={<SandboxMenu />}>
        <Route path={SANDBOX_ROUTES.COMPONENT} element={<ComponentMenu />}>
          <Route
            path={SANDBOX_ROUTES.SANDBOX_COMPONENT}
            element={<SandboxComponents />}
          >
            <Route
              path={SANDBOX_ROUTES.STRING_INTERPOLATION}
              element={<StringInterpolation />}
            />
            <Route path={SANDBOX_ROUTES.TEMPLATE} element={<Template />} />
            <Route path={SANDBOX_ROUTES.LOGIC} element={<Logic />} />
            <Route path={SANDBOX_ROUTES.BABEL} element={<Babel />} />
            <Route path={SANDBOX_ROUTES.STYLES} element={<StaylesMenu />}>
              <Route
                path={SANDBOX_ROUTES.STYLE_MODULE}
                element={<StyleModule />}
              />
              <Route path={SANDBOX_ROUTES.STYLES_2} element={<Styles />} />
            </Route>
            <Route path={SANDBOX_ROUTES.EVENTS} element={<EventsMenu />}>
              <Route path={SANDBOX_ROUTES.ONCLICK} element={<OnClick />} />
              <Route
                path={SANDBOX_ROUTES.RAISING_EVENTS}
                element={<RaisingEvents />}
              />
            </Route>
            <Route
              path={SANDBOX_ROUTES.CONDITIONAL}
              element={<ConditionalRendering />}
            />
            <Route path={SANDBOX_ROUTES.LOOPS} element={<Loops />} />
          </Route>
          <Route
            path={SANDBOX_ROUTES.MUI_COMPONENT}
            element={<MuiSandboxMenu />}
          >
            <Route
              path={SANDBOX_ROUTES.DATA_DISPLAY}
              element={<DatatDisplayMenu />}
            >
              <Route path={SANDBOX_ROUTES.MUI_BUTTON} element={<MuiButton />} />
              <Route
                path={SANDBOX_ROUTES.MUI_DIVIDER}
                element={<MuiDivider />}
              />
              <Route
                path={SANDBOX_ROUTES.MUI_TYPOGRAPHY}
                element={<MuiTypography />}
              />
            </Route>
            <Route path={SANDBOX_ROUTES.LAYOUT} element={<LayotMenu />}>
              <Route path={SANDBOX_ROUTES.MUI_BOX} element={<MuiBox />} />
              <Route
                path={SANDBOX_ROUTES.MUI_CONTAINER}
                element={<MuiContainer />}
              />
              <Route path={SANDBOX_ROUTES.MUI_GRID} element={<MuiGrid />} />
              <Route path={SANDBOX_ROUTES.MUI_STACK} element={<MuiStack />} />
            </Route>
            <Route
              path={SANDBOX_ROUTES.NAVIGATION}
              element={<NavigationMenu />}
            >
              <Route
                path={SANDBOX_ROUTES.MUI_APP_BAR}
                element={<MuiAppBar />}
              />
              <Route
                path={SANDBOX_ROUTES.MUI_BOTTOM_NAVIGATION}
                element={<MuiBottomNavigation />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
