#!/usr/bin/env node
/**
 * Script de teste de integração Frontend-Backend
 * Simula chamadas do Next.js para a API Django
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api';

async function testEndpoint(name, url, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testando: ${name}`);
  console.log(`URL: ${url}`);
  
  try {
    const response = await axios({
      url,
      method: options.method || 'GET',
      data: options.data,
      timeout: 5000,
      withCredentials: true, // Simula configuração do frontend
    });
    
    console.log(`✅ Status: ${response.status}`);
    
    if (Array.isArray(response.data)) {
      console.log(`✅ Retornou ${response.data.length} itens`);
      if (response.data.length > 0) {
        console.log('Exemplo do primeiro item:');
        console.log(JSON.stringify(response.data[0], null, 2).substring(0, 200) + '...');
      }
    } else {
      console.log('✅ Resposta recebida:');
      console.log(JSON.stringify(response.data, null, 2).substring(0, 300));
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Data: ${JSON.stringify(error.response.data).substring(0, 200)}`);
    }
    return false;
  }
}

async function testCORS() {
  console.log(`\n${'='.repeat(60)}`);
  console.log('Testando: CORS Configuration');
  console.log(`${'='.repeat(60)}`);
  
  try {
    const response = await axios.get(`${API_BASE_URL}/health/`, {
      headers: {
        'Origin': 'http://localhost:3000'
      }
    });
    
    const corsHeader = response.headers['access-control-allow-origin'];
    const credentialsHeader = response.headers['access-control-allow-credentials'];
    
    console.log(`✅ CORS Origin: ${corsHeader || 'Não configurado'}`);
    console.log(`✅ CORS Credentials: ${credentialsHeader || 'Não configurado'}`);
    
    if (corsHeader && corsHeader.includes('localhost:3000')) {
      console.log('✅ CORS está configurado corretamente para o frontend!');
      return true;
    } else {
      console.log('⚠️  CORS pode não estar configurado corretamente');
      return false;
    }
  } catch (error) {
    console.log(`❌ Erro ao testar CORS: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('TESTE DE INTEGRAÇÃO FRONTEND-BACKEND');
  console.log('Next.js (Frontend) ↔ Django (Backend)');
  console.log('='.repeat(60));
  
  const tests = [];
  
  // Teste 1: Health Check
  tests.push(await testEndpoint(
    'Health Check',
    `${API_BASE_URL}/health/`
  ));
  
  // Teste 2: Database Connection
  tests.push(await testEndpoint(
    'Database Connection',
    `${API_BASE_URL}/test-connection/`
  ));
  
  // Teste 3: Voice Categories
  tests.push(await testEndpoint(
    'Voice Categories (GET)',
    `${API_BASE_URL}/categories/`
  ));
  
  // Teste 4: Voice Types
  tests.push(await testEndpoint(
    'Voice Types (GET)',
    `${API_BASE_URL}/voice-types/`
  ));
  
  // Teste 5: Audio Samples
  tests.push(await testEndpoint(
    'Audio Samples (GET)',
    `${API_BASE_URL}/audio-samples/`
  ));
  
  // Teste 6: Featured Audio Samples
  tests.push(await testEndpoint(
    'Featured Audio Samples (GET)',
    `${API_BASE_URL}/audio-samples/featured/`
  ));
  
  // Teste 7: Testimonials
  tests.push(await testEndpoint(
    'Testimonials (GET)',
    `${API_BASE_URL}/testimonials/`
  ));
  
  // Teste 8: CORS
  tests.push(await testCORS());
  
  // Resumo
  console.log(`\n${'='.repeat(60)}`);
  console.log('RESUMO DOS TESTES');
  console.log('='.repeat(60));
  
  const total = tests.length;
  const passed = tests.filter(t => t).length;
  const failed = total - passed;
  
  console.log(`Total de testes: ${total}`);
  console.log(`✅ Passou: ${passed}`);
  console.log(`❌ Falhou: ${failed}`);
  console.log(`Taxa de sucesso: ${((passed/total)*100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 Todos os testes passaram! Integração funcionando perfeitamente!');
    console.log('\n✅ Frontend (Next.js) pode se comunicar com Backend (Django)');
    console.log('✅ CORS está configurado corretamente');
    console.log('✅ Todos os endpoints estão respondendo');
    console.log('\nPróximos passos:');
    console.log('1. Acesse http://localhost:3000 para ver o frontend');
    console.log('2. Acesse http://localhost:8000/admin para ver o admin Django');
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${failed} teste(s) falharam. Verifique os erros acima.`);
    process.exit(1);
  }
}

main();
