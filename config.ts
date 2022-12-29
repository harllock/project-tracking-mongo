import { _Meta } from "./types/interfaces/_Meta"
import { _FetchType } from "./types/enum/_FetchType"
import { _FieldType } from "./types/enum/_FieldType"
import { _Hide } from "./types/enum/_Hide"

const blue = "#1971C2"
const green = "#1e9846"
const grey = "#4b4d52"
const greyGrape = "#493752"
const orange = "#de9a33"
const pink = "#ED8998"
const red = "#eb4034"
const white = "white"

export const global = {
  pageSize: 10,
  colors: { blue, green, grey, greyGrape, orange, pink, red },
}

interface _Config {
  activity: _Meta
  customer: _Meta
  lead: _Meta
  project: _Meta
  user: _Meta
}

export const config: _Config = {
  // activity: {
  //   resourceName: "activity",
  //   searchFields: ["user.name", "description", "name", "project.name"],
  //   gauges: {
  //     main: [
  //       {
  //         gaugeName: "gaugeMainResultsCount",
  //         title: "items",
  //         color: blue,
  //         table: "Activity",
  //       },
  //     ],
  //     row: [
  //       {
  //         gaugeName: "gaugeFormatPrice",
  //         title: "Cost",
  //         priceField: "cost",
  //         color: green,
  //       },
  //     ],
  //   },
  //   page: "activities",
  //   title: "Activities",
  //   table: {
  //     name: "Activity",
  //     sortBy: ["startDate DESC"],
  //     related: ["customer", "project", "user"],
  //     tableFields: [
  //       {
  //         isIcon: true,
  //         header: "Edit",
  //         width: "80px",
  //         color: white,
  //       },
  //       { isDate: true, name: "startDate", header: "Start", width: "12%" },
  //       { name: "name", header: "Name", width: "20%" },
  //       { name: "hours", header: "Hours", width: "8%" },
  //       {
  //         isAutocomplete: true,
  //         name: "user",
  //         header: "User",
  //         width: "20%",
  //       },
  //       {
  //         isAutocomplete: true,
  //         name: "project",
  //         header: "Project",
  //         width: "20%",
  //       },
  //       { name: "description", header: "Description", width: "20%" },
  //     ],
  //     formFields: [
  //       { isDate: true, name: "startDate", header: "Start Date *" },
  //       { name: "name", header: "Name *" },
  //       { name: "hours", header: "Hours *" },
  //       {
  //         name: "cost",
  //         header: "Cost",
  //         hideCreate: true,
  //         hideUpdate: true,
  //         dynamic: { api: "/api/activities/cost" },
  //       },
  //       {
  //         isAutocomplete: true,
  //         name: "customer",
  //         header: "Customer *",
  //         page: "customers",
  //         table: "Customer",
  //         sortBy: ["name"],
  //         related: "project",
  //         relationFilterApi: "/api/relations/findCustomerFromProject",
  //       },
  //       {
  //         isAutocomplete: true,
  //         name: "project",
  //         header: "Project *",
  //         page: "projects",
  //         table: "Project",
  //         sortBy: ["name"],
  //         related: "customer",
  //         relationFilterApi: "/api/relations/findProjectFromCustomer",
  //       },
  //       {
  //         isAutocomplete: true,
  //         name: "user",
  //         header: "User *",
  //         page: "users",
  //         table: "User",
  //         sortBy: ["name"],
  //       },
  //       { isNumber: true, name: "extra", header: "Extra cost" },
  //       { name: "description", header: "Description" },
  //     ],
  //   },
  // },
  customer: {
    gauges: {
      main: [
        {
          color: blue,
          fetch: _FetchType.ATOM,
          label: "items",
          name: "resultCount",
          target: "count",
        },
      ],
      // row: [
      //   {
      //     gaugeName: "gaugeRowChildrenCount",
      //     title: "projects",
      //     color: blue,
      //     childTable: "Project",
      //     relationColumn: "customer",
      //   },
      //   {
      //     gaugeName: "gaugeRowChildrenCount",
      //     title: "activities",
      //     color: blue,
      //     childTable: "Activity",
      //     relationColumn: "customer",
      //   },
      // ],
    },
    page: "customers",
    resourceName: "customer",
    table: {
      name: "Customer",
      sortBy: ["name"],
      related: [],
      tableFields: [
        {
          color: white,
          header: "Edit",
          key: "edit",
          type: _FieldType.ICON,
          width: "50px",
        },
        {
          color: null,
          header: "Name",
          key: "name",
          type: _FieldType.TEXT,
          width: "20%",
        },
        {
          color: null,
          header: "Country",
          key: "country",
          type: _FieldType.TEXT,
          width: "12%",
        },
        {
          color: null,
          header: "City",
          key: "city",
          type: _FieldType.TEXT,
          width: "12%",
        },
        {
          color: null,
          header: "Address N.",
          key: "address",
          type: _FieldType.TEXT,
          width: "24%",
        },
        {
          color: null,
          header: "VAT-ID",
          key: "vat",
          type: _FieldType.TEXT,
          width: "16%",
        },
        {
          color: null,
          header: "Contact Person",
          key: "contactPerson",
          type: _FieldType.TEXT,
          width: "16%",
        },
      ],
      formFields: [
        {
          default: null,
          header: "Name *",
          hide: [_Hide.FALSE],
          key: "name",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Country",
          hide: [_Hide.FALSE],
          key: "country",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "City",
          hide: [_Hide.FALSE],
          key: "city",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Address",
          hide: [_Hide.FALSE],
          key: "address",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Address N",
          hide: [_Hide.FALSE],
          key: "addressNumber",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "CAP",
          hide: [_Hide.FALSE],
          key: "cap",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Phone",
          hide: [_Hide.FALSE],
          key: "phone",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "VAT-ID",
          hide: [_Hide.FALSE],
          key: "vat",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Contact Person",
          hide: [_Hide.FALSE],
          key: "contactPerson",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Contact Person eMail",
          hide: [_Hide.FALSE],
          key: "contactPersonEmail",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Contact Person Phone",
          hide: [_Hide.FALSE],
          key: "contactPersonPhone",
          selection: [],
          type: _FieldType.TEXT,
        },
      ],
    },
    title: "Customers",
  },
  // lead: {
  //   resourceName: "lead",
  //   searchFields: [
  //     "customer.name",
  //     "bid",
  //     "description",
  //     "name",
  //     "status",
  //     "user.name",
  //   ],
  //   gauges: {
  //     main: [
  //       {
  //         gaugeName: "gaugeMainResultsCount",
  //         title: "items",
  //         color: blue,
  //         table: "Project",
  //       },
  //       {
  //         gaugeName: "gaugeMainWhereCounter",
  //         title: "open",
  //         color: orange,
  //         searchFields: ["status"],
  //         searchString: "open",
  //       },
  //       {
  //         gaugeName: "gaugeMainWhereCounter",
  //         title: "win",
  //         color: green,
  //         searchFields: ["status"],
  //         searchString: "win",
  //       },
  //       {
  //         gaugeName: "gaugeMainWhereCounter",
  //         title: "lost",
  //         color: red,
  //         searchFields: ["status"],
  //         searchString: "lost",
  //       },
  //       {
  //         gaugeName: "gaugeRatio",
  //         title: "win rate",
  //         color: blue,
  //         searchFields: ["status"],
  //         numerator: "win",
  //         denominator: "lost",
  //       },
  //     ],
  //     row: [],
  //   },
  //   page: "leads",
  //   title: "Leads",
  //   table: {
  //     name: "Lead",
  //     sortBy: ["startDate DESC"],
  //     related: ["customer", "user"],
  //     tableFields: [
  //       { isIcon: true, header: "Edit", width: "50px", color: white },
  //       {
  //         isDate: true,
  //         name: "startDate",
  //         header: "Creation Date",
  //         width: "16%",
  //       },
  //       {
  //         isAutocomplete: true,
  //         name: "customer",
  //         header: "Customer",
  //         width: "16%",
  //       },
  //       { name: "name", header: "Name", width: "16%" },
  //       { name: "days", header: "Days", width: "16%" },
  //       { name: "description", header: "Description", width: "20%" },
  //       { name: "status", header: "Status", width: "16%" },
  //     ],
  //     formFields: [
  //       { isDate: true, name: "startDate", header: "Creation Date *" },
  //       { name: "name", header: "Name *" },
  //       { name: "description", header: "Description" },
  //       { name: "days", header: "Days *" },
  //       { isNumber: true, name: "pricing", header: "Pricing *" },
  //       {
  //         isAutocomplete: true,
  //         name: "customer",
  //         header: "Customer *",
  //         page: "customers",
  //         table: "Customer",
  //         sortBy: ["name"],
  //       },
  //       {
  //         isAutocomplete: true,
  //         name: "user",
  //         header: "Owner *",
  //         page: "users",
  //         table: "User",
  //         sortBy: ["name"],
  //       },
  //       {
  //         isSelection: true,
  //         name: "status",
  //         header: "Lead Status",
  //         selection: ["open", "win", "lost"],
  //         default: "open",
  //         hideCreate: true,
  //       },
  //       { name: "bid", header: "Bid Number" },
  //     ],
  //   },
  // },
  project: {
    gauges: {
      main: [
        {
          color: blue,
          fetch: _FetchType.ATOM,
          label: "items",
          name: "resultCount",
          target: "count",
        },
        // {
        //   gaugeName: "gaugeProjectsGainsLost",
        //   type: "gain",
        //   title: "Gains",
        //   color: green,
        // },
        // {
        //   gaugeName: "gaugeProjectsGainsLost",
        //   type: "lost",
        //   title: "Lost",
        //   color: red,
        // },
      ],
      // row: [
      //   // {
      //   //   gaugeName: "gaugeRowChildrenCount",
      //   //   title: "activities",
      //   //   color: blue,
      //   //   childTable: "Activity",
      //   //   relationColumn: "project",
      //   // },
      //   // {
      //   //   gaugeName: "gaugeRowAggregate",
      //   //   title: "total hours",
      //   //   color: orange,
      //   //   childTable: "Activity",
      //   //   relationColumn: "project",
      //   //   aggregateField: "hours",
      //   //   timeframe: null,
      //   // },
      //   // {
      //   //   gaugeName: "gaugeFormatPrice",
      //   //   title: "Pricing",
      //   //   priceField: "pricing",
      //   //   color: green,
      //   // },
      //   // {
      //   //   gaugeName: "gaugeAggregateChildrenPrices",
      //   //   title: "Cost",
      //   //   childTable: "Activity",
      //   //   relationColumn: "project",
      //   //   aggregateField: "cost",
      //   //   color: green,
      //   // },
      // ],
    },
    page: "projects",
    resourceName: "project",
    table: {
      name: "Project",
      sortBy: [],
      related: [],
      tableFields: [
        {
          color: white,
          header: "Edit",
          key: "edit",
          type: _FieldType.ICON,
          width: "50px",
        },
        {
          color: null,
          header: "Start",
          key: "startDate",
          type: _FieldType.DATE,
          width: "12%",
        },
        {
          color: null,
          header: "Name",
          key: "name",
          type: _FieldType.TEXT,
          width: "20%",
        },
        {
          color: null,
          header: "Days",
          key: "days",
          type: _FieldType.TEXT,
          width: "10%",
        },
        {
          color: null,
          header: "Delivery",
          key: "deliveryDate",
          type: _FieldType.DATE,
          width: "12%",
        },
        {
          color: null,
          header: "Customer",
          key: "customer",
          type: _FieldType.AUTOCOMPLETE,
          width: "16%",
        },
        {
          color: null,
          header: "Description",
          key: "description",
          type: _FieldType.TEXT,
          width: "30%",
        },
      ],
      formFields: [
        {
          default: null,
          header: "Start Date *",
          hide: [_Hide.FALSE],
          key: "startDate",
          selection: [],
          type: _FieldType.DATE,
        },
        {
          default: null,
          header: "Name *",
          hide: [_Hide.FALSE],
          key: "name",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Days *",
          hide: [_Hide.FALSE],
          key: "days",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Delivery Date *",
          hide: [_Hide.FALSE],
          key: "daliveryDate",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Pricing *",
          hide: [_Hide.FALSE],
          key: "pricing",
          selection: [],
          type: _FieldType.NUMBER,
        },
        {
          default: null,
          header: "Customer *",
          hide: [_Hide.FALSE],
          key: "customer",
          selection: [],
          type: _FieldType.AUTOCOMPLETE,
        },
        {
          default: null,
          header: "Owner *",
          hide: [_Hide.FALSE],
          key: "user",
          selection: [],
          type: _FieldType.AUTOCOMPLETE,
        },
        {
          default: null,
          header: "Description",
          hide: [_Hide.FALSE],
          key: "description",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Project Status *",
          hide: [_Hide.CREATE],
          key: "status",
          selection: ["open", "closed"],
          type: _FieldType.SELECTION,
        },
      ],
    },
    title: "Projects",
  },
  user: {
    gauges: {
      main: [
        {
          color: blue,
          fetch: _FetchType.ATOM,
          label: "items",
          name: "resultCount",
          target: "count",
        },
        // {
        //   gaugeName: "gaugeMainAggregate",
        //   title: "this month h.",
        //   color: orange,
        //   childTable: "Activity",
        //   aggregateField: "hours",
        //   timeframe: "currentMonth",
        // },
      ],
      // row: [
      //   {
      //     gaugeName: "gaugeRowChildrenCount",
      //     title: "activities",
      //     color: blue,
      //     childTable: "Activity",
      //     relationColumn: "user",
      //   },
      //   {
      //     gaugeName: "gaugeRowAggregate",
      //     title: "this month h.",
      //     color: orange,
      //     childTable: "Activity",
      //     relationColumn: "user",
      //     aggregateField: "hours",
      //     timeframe: "currentMonth",
      //   },
      //   {
      //     gaugeName: "gaugeRowAggregate",
      //     title: "last month h.",
      //     color: orange,
      //     childTable: "Activity",
      //     relationColumn: "user",
      //     aggregateField: "hours",
      //     timeframe: "lastMonth",
      //   },
      // ],
    },
    page: "users",
    resourceName: "user",
    table: {
      name: "User",
      sortBy: ["name"],
      related: [],
      tableFields: [
        {
          color: white,
          header: "Edit",
          key: "Edit",
          type: _FieldType.ICON,
          width: "80px",
        },
        {
          color: null,
          header: "Name",
          key: "name",
          type: _FieldType.TEXT,
          width: "16%",
        },
        {
          color: null,
          header: "Email",
          key: "email",
          type: _FieldType.TEXT,
          width: "20%",
        },
        {
          color: null,
          header: "City",
          key: "address",
          type: _FieldType.TEXT,
          width: "16%",
        },
        {
          color: null,
          header: "Phone",
          key: "phone",
          type: _FieldType.TEXT,
          width: "16%",
        },
        {
          color: null,
          header: "Skill",
          key: "skill",
          type: _FieldType.TEXT,
          width: "16%",
        },
        {
          color: null,
          header: "Contract",
          key: "contract",
          type: _FieldType.TEXT,
          width: "16%",
        },
      ],
      formFields: [
        {
          default: null,
          header: "Name *",
          hide: [_Hide.FALSE],
          key: "name",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Email *",
          hide: [_Hide.FALSE],
          key: "email",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: "user",
          header: "Role",
          hide: [_Hide.FALSE],
          key: "role",
          selection: ["admin", "user"],
          type: _FieldType.SELECTION,
        },
        {
          default: null,
          header: "Password *",
          hide: [_Hide.UPDATE],
          key: "password",
          selection: [],
          type: _FieldType.PASSWORD,
        },
        {
          default: null,
          header: "City",
          hide: [_Hide.FALSE],
          key: "address",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Phone",
          hide: [_Hide.FALSE],
          key: "phone",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Skill",
          hide: [_Hide.FALSE],
          key: "skill",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Contract",
          hide: [_Hide.FALSE],
          key: "contract",
          selection: [],
          type: _FieldType.TEXT,
        },
        {
          default: null,
          header: "Hourly Wage *",
          hide: [_Hide.FALSE],
          key: "hourlyWage",
          selection: [],
          type: _FieldType.TEXT,
        },
      ],
    },
    title: "Users",
  },
}
