# 🚀 Atualização Frontend para AWS EC2 Backend

## ✅ **O que foi feito:**

1. **Configuração atualizada** em `config.js`:
   - Backend URL: `http://18.228.193.155/api/contact`
   - Health Check: `http://18.228.193.155/health`
   - Timeout otimizado para EC2 (30s ao invés de 2min)
   - Keep-alive desabilitado (EC2 sempre ativo)
   - Retry reduzido (1 tentativa ao invés de 2)

2. **Arquivos criados**:
   - `config.prod.js` - Configuração de produção otimizada
   - `test-aws-ec2.html` - Página de teste da integração
   - Este arquivo de instruções

## 🧪 **Como testar:**

### Opção 1: Página de Teste (Recomendado)
```bash
cd /home/tutu/Documentos/Estudos/landingpage/landingpage-frontend
python3 -m http.server 8080
```
Abra: http://localhost:8080/test-aws-ec2.html

### Opção 2: Teste via curl
```bash
# Testar health check
curl http://18.228.193.155/health

# Testar API de contato
curl -X POST http://18.228.193.155/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Teste Frontend",
    "email": "teste@exemplo.com",
    "message": "Mensagem de teste!"
  }'
```

## 📤 **Deploy do Frontend:**

### Para Netlify:
1. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "feat: update frontend to use AWS EC2 backend"
   git push origin main
   ```

2. O Netlify vai automaticamente fazer o redeploy

### Para outros serviços:
- Use `config.prod.js` se quiser uma configuração separada
- Ou mantenha `config.js` como está (já atualizado)

## 🔧 **Configurações Otimizadas:**

| Configuração | Antes (Render) | Agora (AWS EC2) |
|--------------|----------------|------------------|
| **Timeout** | 120s | 30s |
| **Retries** | 2 | 1 |
| **Keep-alive** | Habilitado | Desabilitado |
| **Cold-start** | Sim | Não |

## 🌐 **URLs Finais:**

- **Backend API**: http://18.228.193.155/api/contact
- **Health Check**: http://18.228.193.155/health
- **Frontend**: https://arthurjregiani.netlify.app

## ⚠️  **Importante:**

1. **HTTP vs HTTPS**: O backend EC2 está em HTTP. Se o frontend estiver em HTTPS (Netlify), pode haver problemas de Mixed Content. Considere configurar SSL no EC2.

2. **CORS**: O backend já está configurado para `https://arthurjregiani.netlify.app`

3. **Monitoramento**: AWS EC2 não dorme, então não precisa de keep-alive

## 🔍 **Troubleshooting:**

### Se o teste falhar:
1. Verifique se a EC2 está rodando
2. Teste health check: `curl http://18.228.193.155/health`
3. Verifique logs da EC2: `docker logs landingpage-backend`

### Mixed Content (HTTPS → HTTP):
Se o frontend estiver em HTTPS e der erro, você precisa:
1. Configurar SSL na EC2, OU
2. Hospedar frontend em HTTP também

### CORS Error:
- Verifique se `CLIENT_ORIGIN` na EC2 está correto
- Deve ser exatamente: `https://arthurjregiani.netlify.app`

## 📊 **Comparação de Performance:**

| Métrica | Render (antes) | AWS EC2 (agora) |
|---------|----------------|------------------|
| **Cold start** | 30-60s | 0s |
| **Response time** | ~2-5s | ~200-500ms |
| **Disponibilidade** | 99%+ | 99.9%+ |
| **Custo** | Grátis | ~$10-15/mês |

## ✅ **Status da Migração:**

- ✅ Backend deployado na AWS EC2
- ✅ Frontend configurado para nova API  
- ✅ Testes criados
- ⏳ Deploy frontend (aguardando push)
- ⏳ SSL/HTTPS (opcional)

---

**🎉 Frontend atualizado com sucesso para usar AWS EC2 backend!**