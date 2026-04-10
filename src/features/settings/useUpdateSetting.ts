import { updateSetting as updateSettingApi } from '@services/settings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { isPending: isPendingUpdate, mutate: updateSetting } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success('Settings updated successfully!');
			queryClient.invalidateQueries({
				queryKey: ['settings'],
			});
		},
		onError: () => toast.error('Failed to update settings.'),
	});

	return { isPendingUpdate, updateSetting };
}
