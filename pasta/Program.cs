// Cria um construtor para a aplicação web
var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao contêiner de dependências
builder.Services.AddRazorPages();  // Adiciona serviços para páginas Razor

var app = builder.Build();  // Constrói a aplicação web

// Define o pipeline de processamento de requisições HTTP
if (!app.Environment.IsDevelopment())  // Verifica se não é um ambiente de desenvolvimento
{
    // Adiciona middleware para tratamento de exceções (página de erro)
    app.UseExceptionHandler("/Error");
    // Adiciona middleware para Strict Transport Security (HSTS) - opcional para produção
    app.UseHsts();
}

// Redireciona automaticamente requisições HTTP para HTTPS (opcional)
app.UseHttpsRedirection();

// Adiciona middleware para servir arquivos estáticos (imagens, CSS, JavaScript)
app.UseStaticFiles();

// Define o roteamento da aplicação
app.UseRouting();

// Adiciona middleware de autorização (verifique se necessário)
app.UseAuthorization();

// Define o mapeamento de rotas para as páginas Razor
app.MapRazorPages();

// Inicia a escuta da aplicação web
app.Run();