from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import UserSearchSerializer
from django.db.models import Q

class UserSearchList(viewsets.ModelViewSet):
    queryset = UserSearching.objects.all()
    serializer_class = UserSearchSerializer

    def get_queryset(self):
        print(self.request.query_params)
        queries1 = self.request.query_params.get('query1', None)
        queries1 = queries1.split(',')
        queries2 = self.request.query_params.get('query2', None)
        queries2 = queries2.split(',')
        queries3 = self.request.query_params.get('query3', None)
        queries4 = self.request.query_params.get('query4', None)
        results1 = UserSearching.objects.none();
        results2 = UserSearching.objects.none();

        for query in queries1:
            filterResult = UserSearching.objects.filter(Q(index__icontains=query) | Q(age__icontains=query)| Q(eyeColor__icontains=query)| Q(name__icontains=query)| Q(gender__icontains=query)| Q(company__icontains=query)| Q(email__icontains=query)| Q(phone__icontains=query)| Q(address__icontains=query)| Q(favoriteFruit__icontains=query))
            results1 = filterResult | results1;

        for query in queries2:
            filterResult = results1.filter(Q(favoriteFruit__icontains=query))
            results2 = filterResult | results2;

        if queries3 != 'undefined':
            results3 = results2.filter(Q(gender__icontains=queries3))
            if queries4 != 'undefined':
                results = results3.filter(Q(eyeColor__icontains=queries4))
                all_results = list(results)
                return all_results
            else:
                all_results = list(results3)
                return all_results
        else:
            all_results = list(results2)
            return all_results