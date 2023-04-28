GraphQL Queries and Responses
=============================

# Create a car

<details>

<summary>Request & Response</summary>

### Request
```graphql
mutation CreateCar {
  createCar(createCarInput: {
    Make: LOTUS
    Model: "Emira",
    Year: 2024,
    Color: BLUE
  }) {
    VehicleID
    Make
    Model
    Year
    Color
    Automaker {
      MakeId
      Make
      __typename
    }
    __typename
  }
}
```

### Response
```json
{
  "data": {
    "createCar": {
      "VehicleID": "14",
      "Make": "LOTUS",
      "Model": "Emira",
      "Year": 2024,
      "Color": "BLUE",
      "Automaker": {
        "MakeId": "11",
        "Make": "Lotus",
        "__typename": "Automaker"
      },
      "__typename": "Car"
    }
  }
}
```
</details>

# Get list of all cars stored

<details>

<summary>Request & Response</summary>

### Request
```graphql
query Cars {
  GetAllCars {
    VehicleID
    Make
    Model
    Year
    Color
    Automaker {
      MakeId
      Make
    }
    __typename
  }
}
```

### Response
```json
{
  "data": {
    "GetAllCars": [
      {
        "VehicleID": "8",
        "Make": "TOYOTA",
        "Model": "COrolla",
        "Year": 2010,
        "Color": "BLUE",
        "Automaker": {
          "MakeId": "8",
          "Make": "Toyota"
        },
        "__typename": "Car"
      },
      {
        "VehicleID": "9",
        "Make": "TOYOTA",
        "Model": "Camry",
        "Year": 2010,
        "Color": "BLACK",
        "Automaker": {
          "MakeId": "8",
          "Make": "Toyota"
        },
        "__typename": "Car"
      },
      {
        "VehicleID": "10",
        "Make": "HONDA",
        "Model": "Fit",
        "Year": 2010,
        "Color": "GOLD",
        "Automaker": {
          "MakeId": "9",
          "Make": "Honda"
        },
        "__typename": "Car"
      },
      {
        "VehicleID": "11",
        "Make": "HONDA",
        "Model": "Accord",
        "Year": 2010,
        "Color": "WHITE",
        "Automaker": {
          "MakeId": "9",
          "Make": "Honda"
        },
        "__typename": "Car"
      },
      {
        "VehicleID": "12",
        "Make": "HONDA",
        "Model": "Corolla",
        "Year": 2010,
        "Color": "BLUE",
        "Automaker": {
          "MakeId": "9",
          "Make": "Honda"
        },
        "__typename": "Car"
      },
      {
        "VehicleID": "13",
        "Make": "ACURA",
        "Model": "FX2",
        "Year": 2010,
        "Color": "BLUE",
        "Automaker": {
          "MakeId": "10",
          "Make": "Acura"
        },
        "__typename": "Car"
      },
      {
        "VehicleID": "14",
        "Make": "LOTUS",
        "Model": "Emira",
        "Year": 2024,
        "Color": "BLUE",
        "Automaker": {
          "MakeId": "11",
          "Make": "Lotus"
        },
        "__typename": "Car"
      }
    ]
  }
}
```

</details>

# Fetch list of cars grouped by model

<details>

<summary>Request & Response</summary>

### Request
```graphql
query GetCarsByModel {
   GetCarsByModel{
    MakeId
    Make
    __typename
    Cars {
      VehicleID
      Make
      Model
      Year
      Color
      __typename
    }
  }
}
```

### Response
```json
{
  "data": {
    "GetCarsByModel": [
      {
        "MakeId": "8",
        "Make": "Toyota",
        "__typename": "Automaker",
        "Cars": [
          {
            "VehicleID": "8",
            "Make": "TOYOTA",
            "Model": "COrolla",
            "Year": 2010,
            "Color": "BLUE",
            "__typename": "Car"
          },
          {
            "VehicleID": "9",
            "Make": "TOYOTA",
            "Model": "Camry",
            "Year": 2010,
            "Color": "BLACK",
            "__typename": "Car"
          }
        ]
      },
      {
        "MakeId": "9",
        "Make": "Honda",
        "__typename": "Automaker",
        "Cars": [
          {
            "VehicleID": "10",
            "Make": "HONDA",
            "Model": "Fit",
            "Year": 2010,
            "Color": "GOLD",
            "__typename": "Car"
          },
          {
            "VehicleID": "11",
            "Make": "HONDA",
            "Model": "Accord",
            "Year": 2010,
            "Color": "WHITE",
            "__typename": "Car"
          },
          {
            "VehicleID": "12",
            "Make": "HONDA",
            "Model": "Corolla",
            "Year": 2010,
            "Color": "BLUE",
            "__typename": "Car"
          }
        ]
      },
      {
        "MakeId": "10",
        "Make": "Acura",
        "__typename": "Automaker",
        "Cars": [
          {
            "VehicleID": "13",
            "Make": "ACURA",
            "Model": "FX2",
            "Year": 2010,
            "Color": "BLUE",
            "__typename": "Car"
          }
        ]
      },
      {
        "MakeId": "11",
        "Make": "Lotus",
        "__typename": "Automaker",
        "Cars": [
          {
            "VehicleID": "14",
            "Make": "LOTUS",
            "Model": "Emira",
            "Year": 2024,
            "Color": "BLUE",
            "__typename": "Car"
          }
        ]
      }
    ]
  }
}
```

</details>
