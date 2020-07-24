import React from "react";
import { Route, Switch } from "react-router-dom";

// home components
import Home from "./Home";
import NoMatch from "./noMatch";
// user components
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import ProtectedRoute from "./user/protectedRoute"; 
// restaurant components 
import Restaurant from "./restaurant/restuarant";

// TEST
const apiData = [
  {
    id: 4,
    name: "Blackberry Cookies",
    subdomain: "Blackberry Cookies",
    created_at: "2020-07-22T01:08:21.550Z",
    updated_at: "2020-07-22T01:08:21.550Z",
    theme: {
      id: 11,
      theme_class: "bold",
      created_at: "2020-07-22T01:08:21.580Z",
      updated_at: "2020-07-22T01:08:21.580Z",
      themeable_type: "Restaurant",
      themeable_id: 7,
    },
    styles: {
      headerColour: "#2F2F2F",
      textColour: "#2F2F2F",
      backgroundColour: "#BDC4A7",
      foregroundColour: "#F3F9D2",
    },
    menus: [
      {
        id: 7,
        title: "lunch",
        created_at: "2020-07-22T01:08:21.574Z",
        updated_at: "2020-07-22T01:08:21.574Z",
        items: [
          {
            id: 31,
            name: "Tiramisù",
            sizes: [
              {
                id: 44,
                name: "bebe",
                price: 21075,
                created_at: "2020-07-22T01:08:21.619Z",
                updated_at: "2020-07-22T01:08:21.619Z",
                item_id: 31,
              },
            ],
            tags: [
              {
                id: 91,
                name: "takeaway available",
                created_at: "2020-07-22T01:08:21.597Z",
                updated_at: "2020-07-22T01:08:21.597Z",
              },
            ],
            theme: {
              id: 11,
              theme_class: "bold",
              created_at: "2020-07-22T01:08:21.580Z",
              updated_at: "2020-07-22T01:08:21.580Z",
              themeable_type: "Restaurant",
              themeable_id: 7,
            },
            ingredients: [
              {
                id: 56,
                name: "Grapefruit",
                created_at: "2020-07-22T01:08:21.624Z",
                updated_at: "2020-07-22T01:08:21.624Z",
                item_id: 31,
              },
              {
                id: 57,
                name: "Eggplant",
                created_at: "2020-07-22T01:08:21.629Z",
                updated_at: "2020-07-22T01:08:21.629Z",
                item_id: 31,
              },
              {
                id: 58,
                name: "Celery",
                created_at: "2020-07-22T01:08:21.633Z",
                updated_at: "2020-07-22T01:08:21.633Z",
                item_id: 31,
              },
            ],
            styles: [],
          },
          {
            id: 32,
            name: "Poke",
            sizes: [
              {
                id: 45,
                name: "whoppa™",
                price: 42922,
                created_at: "2020-07-22T01:08:21.666Z",
                updated_at: "2020-07-22T01:08:21.666Z",
                item_id: 32,
              },
              {
                id: 46,
                name: "hella big",
                price: 17000,
                created_at: "2020-07-22T01:08:21.671Z",
                updated_at: "2020-07-22T01:08:21.671Z",
                item_id: 32,
              },
            ],
            tags: [
              {
                id: 94,
                name: "main",
                created_at: "2020-07-22T01:08:21.644Z",
                updated_at: "2020-07-22T01:08:21.644Z",
              },
            ],
            ingredients: [
              {
                id: 59,
                name: "Provolone",
                created_at: "2020-07-22T01:08:21.676Z",
                updated_at: "2020-07-22T01:08:21.676Z",
                item_id: 32,
              },
              {
                id: 60,
                name: "Sweet Chilli Sauce",
                created_at: "2020-07-22T01:08:21.681Z",
                updated_at: "2020-07-22T01:08:21.681Z",
                item_id: 32,
              },
            ],
            styles: [],
          },
          {
            id: 33,
            name: "Peking Duck",
            sizes: [],
            tags: [
              {
                id: 97,
                name: "takeaway available",
                created_at: "2020-07-22T01:08:21.695Z",
                updated_at: "2020-07-22T01:08:21.695Z",
              },
            ],
            ingredients: [
              {
                id: 61,
                name: "Tempeh",
                created_at: "2020-07-22T01:08:21.715Z",
                updated_at: "2020-07-22T01:08:21.715Z",
                item_id: 33,
              },
              {
                id: 62,
                name: "Milk",
                created_at: "2020-07-22T01:08:21.720Z",
                updated_at: "2020-07-22T01:08:21.720Z",
                item_id: 33,
              },
              {
                id: 63,
                name: "Pecan Nut",
                created_at: "2020-07-22T01:08:21.726Z",
                updated_at: "2020-07-22T01:08:21.726Z",
                item_id: 33,
              },
              {
                id: 64,
                name: "Parsnip",
                created_at: "2020-07-22T01:08:21.731Z",
                updated_at: "2020-07-22T01:08:21.731Z",
                item_id: 33,
              },
            ],
            styles: [],
          },
          {
            id: 34,
            name: "Cheeseburger",
            sizes: [
              {
                id: 47,
                name: "whoppa™",
                price: 32769,
                created_at: "2020-07-22T01:08:21.764Z",
                updated_at: "2020-07-22T01:08:21.764Z",
                item_id: 34,
              },
              {
                id: 48,
                name: "bebe",
                price: 32381,
                created_at: "2020-07-22T01:08:21.769Z",
                updated_at: "2020-07-22T01:08:21.769Z",
                item_id: 34,
              },
            ],
            tags: [
              {
                id: 100,
                name: "main",
                created_at: "2020-07-22T01:08:21.744Z",
                updated_at: "2020-07-22T01:08:21.744Z",
              },
            ],
            ingredients: [
              {
                id: 65,
                name: "Mandarins",
                created_at: "2020-07-22T01:08:21.774Z",
                updated_at: "2020-07-22T01:08:21.774Z",
                item_id: 34,
              },
              {
                id: 66,
                name: "Bread",
                created_at: "2020-07-22T01:08:21.778Z",
                updated_at: "2020-07-22T01:08:21.778Z",
                item_id: 34,
              },
            ],
            styles: [],
          },
          {
            id: 35,
            name: "Risotto with Seafood",
            sizes: [
              {
                id: 49,
                name: "hella big",
                price: 29013,
                created_at: "2020-07-22T01:08:21.808Z",
                updated_at: "2020-07-22T01:08:21.808Z",
                item_id: 35,
              },
            ],
            tags: [
              {
                id: 103,
                name: "entrée",
                created_at: "2020-07-22T01:08:21.788Z",
                updated_at: "2020-07-22T01:08:21.788Z",
              },
            ],
            ingredients: [
              {
                id: 67,
                name: "Tea Oil",
                created_at: "2020-07-22T01:08:21.813Z",
                updated_at: "2020-07-22T01:08:21.813Z",
                item_id: 35,
              },
              {
                id: 68,
                name: "Bean Sprouts",
                created_at: "2020-07-22T01:08:21.818Z",
                updated_at: "2020-07-22T01:08:21.818Z",
                item_id: 35,
              },
            ],
            styles: [],
          },
        ],
        theme: {
          id: 11,
          theme_class: "bold",
          created_at: "2020-07-22T01:08:21.580Z",
          updated_at: "2020-07-22T01:08:21.580Z",
          themeable_type: "Menu",
          themeable_id: 7,
        },
        styles: [
          {
            id: 11,
            style_data: "{json string of style data}",
            created_at: "2020-07-22T01:08:21.585Z",
            updated_at: "2020-07-22T01:08:21.585Z",
            styleable_type: "Menu",
            styleable_id: 7,
          },
        ],
      },
      {
        id: 8,
        title: "evening",
        created_at: "2020-07-22T01:08:21.826Z",
        updated_at: "2020-07-22T01:08:21.826Z",
        items: [
          {
            id: 36,
            name: "California Maki",
            sizes: [
              {
                id: 50,
                name: "bebe",
                price: 28429,
                created_at: "2020-07-22T01:08:21.871Z",
                updated_at: "2020-07-22T01:08:21.871Z",
                item_id: 36,
              },
              {
                id: 51,
                name: "bebe",
                price: 36237,
                created_at: "2020-07-22T01:08:21.875Z",
                updated_at: "2020-07-22T01:08:21.875Z",
                item_id: 36,
              },
            ],
            tags: [
              {
                id: 106,
                name: "main",
                created_at: "2020-07-22T01:08:21.849Z",
                updated_at: "2020-07-22T01:08:21.849Z",
              },
            ],
            ingredients: [
              {
                id: 69,
                name: "Green Tea",
                created_at: "2020-07-22T01:08:21.881Z",
                updated_at: "2020-07-22T01:08:21.881Z",
                item_id: 36,
              },
              {
                id: 70,
                name: "Nori",
                created_at: "2020-07-22T01:08:21.889Z",
                updated_at: "2020-07-22T01:08:21.889Z",
                item_id: 36,
              },
              {
                id: 71,
                name: "Cumin",
                created_at: "2020-07-22T01:08:21.894Z",
                updated_at: "2020-07-22T01:08:21.894Z",
                item_id: 36,
              },
              {
                id: 72,
                name: "Butternut Lettuce",
                created_at: "2020-07-22T01:08:21.900Z",
                updated_at: "2020-07-22T01:08:21.900Z",
                item_id: 36,
              },
            ],
            styles: [],
          },
          {
            id: 37,
            name: "Cauliflower Penne",
            sizes: [
              {
                id: 52,
                name: "whoppa™",
                price: 26270,
                created_at: "2020-07-22T01:08:21.936Z",
                updated_at: "2020-07-22T01:08:21.936Z",
                item_id: 37,
              },
              {
                id: 53,
                name: "whoppa™",
                price: 32727,
                created_at: "2020-07-22T01:08:21.941Z",
                updated_at: "2020-07-22T01:08:21.941Z",
                item_id: 37,
              },
            ],
            tags: [
              {
                id: 109,
                name: "entrée",
                created_at: "2020-07-22T01:08:21.911Z",
                updated_at: "2020-07-22T01:08:21.911Z",
              },
            ],
            ingredients: [
              {
                id: 73,
                name: "Basil Basmati Rice",
                created_at: "2020-07-22T01:08:21.949Z",
                updated_at: "2020-07-22T01:08:21.949Z",
                item_id: 37,
              },
              {
                id: 74,
                name: "Jewfish",
                created_at: "2020-07-22T01:08:21.957Z",
                updated_at: "2020-07-22T01:08:21.957Z",
                item_id: 37,
              },
              {
                id: 75,
                name: "Nectarines",
                created_at: "2020-07-22T01:08:21.963Z",
                updated_at: "2020-07-22T01:08:21.963Z",
                item_id: 37,
              },
              {
                id: 76,
                name: "White Bread",
                created_at: "2020-07-22T01:08:21.970Z",
                updated_at: "2020-07-22T01:08:21.970Z",
                item_id: 37,
              },
            ],
            styles: [],
          },
          {
            id: 38,
            name: "Chicken Wings",
            sizes: [
              {
                id: 54,
                name: "bebe",
                price: 8299,
                created_at: "2020-07-22T01:08:22.012Z",
                updated_at: "2020-07-22T01:08:22.012Z",
                item_id: 38,
              },
            ],
            tags: [
              {
                id: 112,
                name: "main",
                created_at: "2020-07-22T01:08:21.984Z",
                updated_at: "2020-07-22T01:08:21.984Z",
              },
            ],
            ingredients: [],
            styles: [],
          },
          {
            id: 39,
            name: "Seafood Paella",
            sizes: [
              {
                id: 55,
                name: "bebe",
                price: 35974,
                created_at: "2020-07-22T01:08:22.046Z",
                updated_at: "2020-07-22T01:08:22.046Z",
                item_id: 39,
              },
            ],
            tags: [
              {
                id: 115,
                name: "main",
                created_at: "2020-07-22T01:08:22.023Z",
                updated_at: "2020-07-22T01:08:22.023Z",
              },
            ],
            ingredients: [
              {
                id: 77,
                name: "Cheddar",
                created_at: "2020-07-22T01:08:22.052Z",
                updated_at: "2020-07-22T01:08:22.052Z",
                item_id: 39,
              },
              {
                id: 78,
                name: "Sugar",
                created_at: "2020-07-22T01:08:22.057Z",
                updated_at: "2020-07-22T01:08:22.057Z",
                item_id: 39,
              },
              {
                id: 79,
                name: "Cloves",
                created_at: "2020-07-22T01:08:22.062Z",
                updated_at: "2020-07-22T01:08:22.062Z",
                item_id: 39,
              },
              {
                id: 80,
                name: "Feijoa",
                created_at: "2020-07-22T01:08:22.067Z",
                updated_at: "2020-07-22T01:08:22.067Z",
                item_id: 39,
              },
            ],
            styles: [],
          },
          {
            id: 40,
            name: "Mushroom Risotto",
            sizes: [
              {
                id: 56,
                name: "whoppa™",
                price: 13799,
                created_at: "2020-07-22T01:08:22.101Z",
                updated_at: "2020-07-22T01:08:22.101Z",
                item_id: 40,
              },
            ],
            tags: [
              {
                id: 118,
                name: "takeaway available",
                created_at: "2020-07-22T01:08:22.079Z",
                updated_at: "2020-07-22T01:08:22.079Z",
              },
            ],
            ingredients: [
              {
                id: 81,
                name: "Mustard",
                created_at: "2020-07-22T01:08:22.106Z",
                updated_at: "2020-07-22T01:08:22.106Z",
                item_id: 40,
              },
            ],
            styles: [],
          },
        ],
        theme: {
          id: 12,
          theme_class: "colourful",
          created_at: "2020-07-22T01:08:21.831Z",
          updated_at: "2020-07-22T01:08:21.831Z",
          themeable_type: "Menu",
          themeable_id: 8,
        },
        styles: [
          {
            id: 12,
            style_data: "{json string of style data}",
            created_at: "2020-07-22T01:08:21.838Z",
            updated_at: "2020-07-22T01:08:21.838Z",
            styleable_type: "Menu",
            styleable_id: 8,
          },
        ],
      },
    ],
    contact_infos: [
      {
        id: 4,
        name: "phone number",
        info_type: "phone number",
        info: "1-654-425-1728 x58683",
        created_at: "2020-07-22T01:08:21.554Z",
        updated_at: "2020-07-22T01:08:21.554Z",
        restaurant_id: 4,
      },
    ],
  },
];
// TEST

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/dashboard" component={ProtectedRoute} />
        <Route exact path="/restaurant" render={() => <Restaurant {...apiData} />} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}

export default App;
