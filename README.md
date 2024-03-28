# App

Urbaniza

## Requisitos Funcionais

- [x] O Usuário poderá se cadastrar fornecendo nome, email e senha;
- [] O Sistema deverá enviar um código de validação da conta para o email do usuário no momento do cadastro para validação do conta.
- [x] O Usuário poderá se autenticar fornecendo seu email e senha de cadastro;
- [] O Usuário deverá aceitar os termos de uso do aplicativo, conforme a LGPD, para se autenticar;
- [x] O Usuário deverá confirmar seu email para se autenticar;
- [x] O Usuário autenticado poderá visualizar seu perfil com todas suas informações;
- [] O Usuário autenticado poderá alterar sua foto de perfil;
- [] O Usuário autenticado poderá alterar sua senha;
- [] O Usuário autenticado poderá alterar o status das notificações;
- [] O Usuário autenticado poderá ver seu histórico de ocorrências;
- [] O Usuário autenticado poderá criar uma nova ocorrência fornecendo endereço, categoria e, de forma opcional, foto e descrição;
- [] O Sistema deverá criar um pin que conterá as informações de latitude e longitude da ocorrência e visibilidade no mapa;
- [] Somente o Usuário autenticado que criou a ocorrência poderá alterar foto e descrição fornecidos;
- [] O Usuário poderá adicionar foto e descrição adicional à ocorrências de outro usuário;
- [] O Usuário autenticado poderá consultar detalhes de uma ocorrência ao clicar em um pin no mapa;
- [] O Usuário autenticado poderá filtrar a categoria dos problemas das ocorrências no mapa;
- [] Somente o Admistrador poderá alterar o status de uma ocorrência;
- [] O Sistema não deverá permitir a exclusão de ocorrências;
- [] O Sistema não deverá permitir a alteração de informações da ocorrência após esta ter sido finalizada;
- [] O Sistema deverá tornar o pin invísivel no mapa, caso a ocorrência correspondente a ele tenha sido encerrada;

## Regras de Negócio

- [x] O Usuário não poderá se cadastrar com email duplicado;
- [] O Usuário autenticado não poderá mudar sua foto de perfil duas vezes por dia;
- [] O Usuário autenticado não poderá mudar sua senha duas vezes por dia;
- [] O Usuário autenticado só poderá mudar sua senha após confirmar por email;

## Requisitos Não Funcionais

- [x] A senha do usuário deverá ser criptografada;
- [] Os dados da aplicação deverão ser persistidos em um banco de dados SQL;