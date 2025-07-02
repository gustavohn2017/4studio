import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings')

import django
django.setup()

from api.models import VoiceCategory, VoiceType, AudioSample, Testimonial
from django.contrib.auth.models import User

# Criar usuário admin se não existir
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@4studio.com.br', 'admin123')
    print("Superusuário 'admin' criado com senha 'admin123'")
else:
    print("Superusuário 'admin' já existe")

# Criar categorias de voz
categories = [
    {
        'name': 'URA Receptiva', 
        'description': 'Unidade de Resposta Audível para atendimento de chamadas recebidas.'
    },
    {
        'name': 'URA Ativa', 
        'description': 'Unidade de Resposta Audível para chamadas realizadas pela empresa.'
    },
    {
        'name': 'Espera Telefônica', 
        'description': 'Mensagens e músicas para o período de espera em chamadas telefônicas.'
    },
    {
        'name': 'Locução para Vídeos', 
        'description': 'Narrações profissionais para vídeos institucionais e promocionais.'
    },
    {
        'name': 'Voz IA', 
        'description': 'Locuções geradas por inteligência artificial.'
    }
]

for cat_data in categories:
    VoiceCategory.objects.get_or_create(
        name=cat_data['name'], 
        defaults={'description': cat_data['description']}
    )
    print(f"Categoria '{cat_data['name']}' criada ou verificada")

# Criar tipos de voz
voice_types = [
    {'name': 'Masculina Padrão', 'gender': 'male', 'is_ai': False},
    {'name': 'Feminina Padrão', 'gender': 'female', 'is_ai': False},
    {'name': 'Masculina Sênior', 'gender': 'male', 'is_ai': False},
    {'name': 'Feminina Sênior', 'gender': 'female', 'is_ai': False},
    {'name': 'IA Masculina', 'gender': 'ai', 'is_ai': True},
    {'name': 'IA Feminina', 'gender': 'ai', 'is_ai': True}
]

for vt_data in voice_types:
    VoiceType.objects.get_or_create(
        name=vt_data['name'], 
        defaults={'gender': vt_data['gender'], 'is_ai': vt_data['is_ai']}
    )
    print(f"Tipo de voz '{vt_data['name']}' criado ou verificado")

# Criar alguns depoimentos
testimonials = [
    {
        'client_name': 'João Silva',
        'company': 'TechSolutions',
        'quote': 'As locuções da 4studio transformaram completamente o atendimento telefônico da nossa empresa. A qualidade é incomparável.'
    },
    {
        'client_name': 'Maria Oliveira',
        'company': 'Banco Nacional',
        'quote': 'Implementamos a URA da 4studio e nossos clientes elogiaram a clareza e profissionalismo das mensagens.'
    },
    {
        'client_name': 'Carlos Mendes',
        'company': 'Seguradora Confiança',
        'quote': 'Utilizamos os serviços de espera telefônica e URA. O processo foi rápido e o resultado superou nossas expectativas.'
    }
]

for t_data in testimonials:
    Testimonial.objects.get_or_create(
        client_name=t_data['client_name'],
        defaults={
            'company': t_data['company'],
            'quote': t_data['quote'],
            'active': True
        }
    )
    print(f"Depoimento de '{t_data['client_name']}' criado ou verificado")

print("\nDados de exemplo criados com sucesso!")
print("\nAgora você pode acessar:")
print("- Admin Django: http://localhost:8000/admin/ (usuário: admin, senha: admin123)")
print("- API: http://localhost:8000/api/")
print("- Frontend: http://localhost:3000/ (certifique-se de iniciar o servidor Next.js)")
