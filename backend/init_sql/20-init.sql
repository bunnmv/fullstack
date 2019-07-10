\connect intelbras

create table if not exists "user"
(
    name varchar(30) not null,
    email varchar(30) not null,
    cpf varchar(14) not null,
    id serial not null
        constraint user_pk
            primary key,
    date_added date default CURRENT_DATE not null,
    birth_date date not null
);

alter table "user" owner to intelbras;

create unique index if not exists user_id_uindex
    on "user" (id);

create unique index if not exists user_cpf_uindex
    on "user" (cpf);

create table if not exists phone
(
    id serial not null
        constraint phone_pk
            primary key,
    user_id integer
        constraint phone_user_id_fk
            references "user"
                on delete cascade,
    number varchar(16),
    type varchar(15)
);

alter table phone owner to intelbras;

create unique index if not exists phone_id_uindex
    on phone (id);

create table if not exists address
(
    id serial not null
        constraint address_pk
            primary key,
    street varchar(50) not null,
    number varchar(10) not null,
    zip_code varchar(9) not null,
    state varchar(20) not null,
    neighborhood varchar(50) not null,
    city varchar(50) not null,
    user_id integer not null
        constraint address_user_id_fk
            references "user"
                on delete cascade
);

alter table address owner to intelbras;

create unique index if not exists address_id_uindex
    on address (id);