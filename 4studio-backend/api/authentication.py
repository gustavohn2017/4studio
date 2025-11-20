from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

UserModel = get_user_model()

class EmailOrUsernameBackend(ModelBackend):
    """
    Backend de autenticação personalizado que permite o login
    usando tanto o e-mail quanto o nome de usuário.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Tenta encontrar um usuário que corresponda ao e-mail ou ao nome de usuário
            user = UserModel.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except UserModel.DoesNotExist:
            # Se nenhum usuário for encontrado, retorna None para que o Django tente outros backends
            return None
        except UserModel.MultipleObjectsReturned:
            # Se múltiplos usuários forem encontrados (ex: mesmo nome de usuário e e-mail em contas diferentes),
            # prioriza a correspondência exata do nome de usuário.
            user = UserModel.objects.filter(username__iexact=username).first()

        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None