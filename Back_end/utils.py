from core.serializer import Person


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': Person(user, context={'request': request}).data
    }




