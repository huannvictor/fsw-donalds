# FSW Donalds

Este é um projeto de um sistema de pedidos para um restaurante fictício chamado FSW Donalds. O sistema permite que os clientes façam pedidos online, selecionem produtos do menu e finalizem seus pedidos.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Tailwind CSS**: Framework CSS para estilização.

## Funcionalidades

- **Listagem de Produtos**: Exibe uma lista de produtos disponíveis no menu do restaurante.
- **Finalização de Pedido**: Permite que o cliente insira suas informações e finalize o pedido.
- **Validação de Email**: Utiliza email do usuário para validar os pedidos.

## Futuras Funcionalidades:
- **Desktop**: Adicionar layout para desktop:
- [x] home (layout e page)
- [x] slug
- [ ] product
- [ ] orders
- **Session Storage**: Mudar a forma de envio de alguns dados, em vez de ser via url, ser por Session Storage.

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/fsw-donalds.git
   cd fsw-donalds
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/fsw-donalds
   ```
   
4. Popule os dados do restaurante:
   ```bash
   npx prisma db seed
   ```

5. Gere o Cliente Prisma para acessar o banco de dados:
   ```bash
   npx prisma generate
   ```

6. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

7. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona minha feature'`).
4. Faça um push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.