#
# Copyright (C) 2011-2014 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=myhello
PKG_RELEASE:=5

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=myhello
  CATEGORY:=Utilities
  TITLE:=Utility to myhello test
  MAINTAINER:=xhsiung Pan <xhsiung@gmail.com>
endef

define Package/$(PKG_NAME)/description
  myhello description
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
echo "postint..."
endef

define Package/$(PKG_NAME)/postrm
#!/bin/sh
echo "postrm..."
endef

define Build/Compile
	$(TARGET_CC) $(TARGET_CFLAGS) -Wall \
		-o $(PKG_BUILD_DIR)/myhello $(PKG_BUILD_DIR)/myhello.c
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/myhello $(1)/usr/bin/
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
