from __future__ import absolute_import
from django.db import models
from django.utils import timezone

from sentry.db.models import (
    Model, FlexibleForeignKey, sane_repr
)


class DeletedOrganization(Model):
    actor_label = models.CharField(max_length=64, null=True, blank=True)
    # if the entry was created via a user
    actor = FlexibleForeignKey('sentry.User', related_name='audit_actors', null=True, blank=True)
    # if the entry was created via an api key
    actor_key = FlexibleForeignKey('sentry.ApiKey', null=True, blank=True)

    ip_address = models.GenericIPAddressField(null=True, unpack_ipv4=True)
    date_deleted = models.DateTimeField(default=timezone.now)

    name = models.CharField(max_length=64)
    slug = models.SlugField(unique=True)

    # freeform field change instead
    reason = models.TextField(blank=True, null=True)

    class Meta:
        app_label = 'sentry'
        db_table = 'sentry_deletedorganization'

    __repr__ = sane_repr('organization_id', 'type')
