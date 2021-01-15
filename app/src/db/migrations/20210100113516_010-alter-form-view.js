
exports.up = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.raw(`create or replace
    view user_form_access_vw as
    select
      r."userId",
      u."keycloakId",
      u.username,
      u."fullName",
      u."firstName",
      u."lastName",
      u.email,
      r."formId",
      f.name as "formName",
      f.labels,
      f."identityProviders",
      f.idps,
      f.active,
      f."formVersionId",
      f.version,
      r.roles,
      p.permissions,
      f.published,
      f."versionUpdatedAt",
	    f.description as "formDescription"
    from
      "user" u
    join user_form_roles_vw r on
      u.id = r."userId"
    join user_form_permissions_vw p on
      r."userId" = p."userId"
      and r."formId" = p."formId"
    join form_vw f on
      f.id = p."formId"
    order by
      lower(u."lastName"::text),
      lower(u."firstName"::text),
      lower(f.name::text)`));
};

exports.down = function (knex) {
  // Restore original definition of this view from 001-views
  return Promise.resolve()
    .then(() => knex.schema.raw(`create or replace
    view user_form_access_vw as
    select
      r."userId",
      u."keycloakId",
      u.username,
      u."fullName",
      u."firstName",
      u."lastName",
      u.email,
      r."formId",
      f.name as "formName",
      f.labels,
      f."identityProviders",
      f.idps,
      f.active,
      f."formVersionId",
      f.version,
      r.roles,
      p.permissions,
      f.published,
      f."versionUpdatedAt"
    from
      "user" u
    join user_form_roles_vw r on
      u.id = r."userId"
    join user_form_permissions_vw p on
      r."userId" = p."userId"
      and r."formId" = p."formId"
    join form_vw f on
      f.id = p."formId"
    order by
      lower(u."lastName"::text),
      lower(u."firstName"::text),
      lower(f.name::text)`));
};
