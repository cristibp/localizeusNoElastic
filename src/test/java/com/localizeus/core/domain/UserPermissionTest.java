package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class UserPermissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserPermission.class);
        UserPermission userPermission1 = new UserPermission();
        userPermission1.setId(1L);
        UserPermission userPermission2 = new UserPermission();
        userPermission2.setId(userPermission1.getId());
        assertThat(userPermission1).isEqualTo(userPermission2);
        userPermission2.setId(2L);
        assertThat(userPermission1).isNotEqualTo(userPermission2);
        userPermission1.setId(null);
        assertThat(userPermission1).isNotEqualTo(userPermission2);
    }
}
