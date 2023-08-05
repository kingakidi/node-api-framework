const { Permission } = require("../models");

let routes = [
  "roles",
  "permissions",
  "users",
  "business",
  "address",
  "category",
  "auth",
  "media",
  "message",
  "voucher",
  "jobs",
  "event",
  "languages",
  "help",
  "course",
  "instructor",
  "test",
  "pricing",
  "section",
  "lecture",
  "assignment",
  "quiz",
  "question",
  "verify",
];
let permissions = [];

routes.forEach(async (route) => {
  let create = `CREATE_${route}`.toLowerCase();
  let view = `VIEW_${route}`.toLowerCase();
  let update = `UPDATE_${route}`.toLowerCase();
  let delete_permission = `DELETE_${route}`.toLowerCase();

  // insert the permissions
  await Permission.bulkCreate([
    { title: create, description: `This is for CREATE ${route} PERMISSION, ` },
    { title: view, description: `This is for VIEW ${route} PERMISSION, ` },
    { title: update, description: `This is for UPDATE ${route} PERMISSION, ` },
    {
      title: delete_permission,
      description: `This is for DELETE ${route} PERMISSION, `,
    },
  ]);
});

async function get_all_permissions() {
  return await Permission.findAll();
}

console.log(get_all_permissions());
